"use server";

import { contactPage } from "@/content/contact";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

const validInterests = new Set<string>(contactPage.interests.map((i) => i.value));

/**
 * お問い合わせの受付。
 *
 * 送信先は環境変数 CONTACT_WEBHOOK_URL で設定する（Slack / Zapier / 自前の
 * エンドポイントなど、JSON を POST で受けられるものなら何でもよい）。
 *
 * 未設定のときは「成功」を返さない。フォームが静かに問い合わせを飲み込むと、
 * 気づかないまま応募や出資の相談を取りこぼすことになるため。
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const intro = String(formData.get("intro") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "お名前をご記入ください。";
  if (!email) {
    fieldErrors.email = "ご返信先のメールアドレスをご記入ください。";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "メールアドレスの形式をご確認ください。";
  }
  if (!message) fieldErrors.message = "お問い合わせ内容をご記入ください。";
  if (!validInterests.has(interest)) fieldErrors.interest = "関心の種類をお選びください。";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "入力内容をご確認ください。",
      fieldErrors,
    };
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) {
    // 個人情報はログに残さない。設定漏れの事実だけを記録する。
    console.error("[contact] CONTACT_WEBHOOK_URL が未設定のため送信できませんでした");
    return {
      status: "error",
      message:
        "申し訳ありません。ただいまフォームからの送信を受け付けられません。お手数ですが official@zen-bu.co へ直接ご連絡ください。",
    };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        intro,
        message,
        interest,
        interestLabel:
          contactPage.interests.find((i) => (i.value as string) === interest)?.label ??
          interest,
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (error) {
    console.error("[contact] 送信に失敗しました", error);
    return {
      status: "error",
      message:
        "送信に失敗しました。お手数ですが official@zen-bu.co へ直接ご連絡ください。",
    };
  }

  return { status: "success" };
}
