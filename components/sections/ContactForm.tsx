"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { contactPage } from "@/content/contact";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const initialState: ContactState = { status: "idle" };

const fieldBase =
  "mt-2 w-full rounded-sm border bg-base px-4 py-3 text-body " +
  "transition-colors duration-200 ease-quiet focus:border-forest";

export function ContactForm({ defaultInterest }: { defaultInterest?: string }) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-sm border border-forest/30 bg-surface p-8 lg:p-10"
      >
        <h2 className="text-h2">お問い合わせを受け付けました。</h2>
        <p className="mt-5 max-w-prose text-body text-ink/85">
          ご連絡ありがとうございます。内容を確認のうえ、数日以内にご返信します。
          しばらく経っても届かない場合は、お手数ですが{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>{" "}
          へ直接ご連絡ください。
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="max-w-prose">
      {/* 送信全体のエラーは、フォーム先頭で必ず知らせる。
          aria-live により、送信後にフォーカスを移さなくても読み上げられる。 */}
      {state.status === "error" && !state.fieldErrors && (
        <p
          role="alert"
          className="mb-8 rounded-sm border border-gold/50 bg-gold/10 p-5 text-body"
        >
          {state.message}
        </p>
      )}

      <div className="space-y-8">
        <div>
          <label htmlFor="name" className="text-h3">
            {contactPage.fields.name.label}
            <span className="ml-2 text-caption text-gold">必須</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(fieldBase, errors.name ? "border-gold" : "border-line")}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-caption text-gold">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-h3">
            メールアドレス
            <span className="ml-2 text-caption text-gold">必須</span>
          </label>
          <p id="email-hint" className="mt-1 text-caption text-ink-muted">
            ご返信先としてお伺いします
          </p>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error email-hint" : "email-hint"}
            className={cn(fieldBase, errors.email ? "border-gold" : "border-line")}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-caption text-gold">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="intro" className="text-h3">
            {contactPage.fields.intro.label}
          </label>
          <p id="intro-hint" className="mt-1 text-caption text-ink-muted">
            {contactPage.fields.intro.hint}
          </p>
          <textarea
            id="intro"
            name="intro"
            rows={4}
            aria-describedby="intro-hint"
            className={cn(fieldBase, "border-line resize-y")}
          />
        </div>

        <div>
          <label htmlFor="message" className="text-h3">
            {contactPage.fields.message.label}
            <span className="ml-2 text-caption text-gold">必須</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              fieldBase,
              "resize-y",
              errors.message ? "border-gold" : "border-line",
            )}
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-caption text-gold">
              {errors.message}
            </p>
          )}
        </div>

        {/* 関心の種類。ラジオグループは fieldset/legend で名前をつける */}
        <fieldset
          aria-invalid={Boolean(errors.interest)}
          aria-describedby={errors.interest ? "interest-error" : "interest-hint"}
        >
          <legend className="text-h3">
            {contactPage.fields.interest.label}
            <span className="ml-2 text-caption text-gold">必須</span>
          </legend>
          <p id="interest-hint" className="mt-1 text-caption text-ink-muted">
            {contactPage.fields.interest.hint}
          </p>

          <div className="mt-4 space-y-px overflow-hidden rounded-sm border border-line bg-line">
            {contactPage.interests.map((option) => (
              <label
                key={option.value}
                className="flex min-h-[52px] cursor-pointer items-center gap-3 bg-base px-4 py-3 has-[:checked]:bg-forest/5"
              >
                <input
                  type="radio"
                  name="interest"
                  value={option.value}
                  defaultChecked={defaultInterest === option.value}
                  className="size-4 accent-[var(--color-forest)]"
                />
                <span className="text-body">{option.label}</span>
              </label>
            ))}
          </div>

          {errors.interest && (
            <p id="interest-error" className="mt-2 text-caption text-gold">
              {errors.interest}
            </p>
          )}
        </fieldset>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-10 inline-flex min-h-[52px] items-center justify-center rounded-sm bg-forest px-8 py-4 text-[0.9375rem] font-medium text-base transition-colors duration-200 ease-quiet hover:bg-forest-deep disabled:opacity-60"
      >
        {pending ? "送信しています…" : contactPage.submitLabel}
      </button>

      <p className="mt-6 text-caption text-ink-muted">
        うまく送信できない場合は{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-4">
          {site.email}
        </a>{" "}
        へ直接ご連絡ください。
      </p>
    </form>
  );
}
