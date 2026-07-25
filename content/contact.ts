/** ページ11｜お問い合わせ。出典：掲載コピー集 ページ11 */

export const contactPage = {
  kicker: "お問い合わせ",
  heading: "まずは、話してみませんか。",
  lead: "移住や出資を、いきなり決める必要はありません。「少し気になる」で十分です。現場メンバー、資金パートナー、そのほかの関心、すべてこの一つのフォームでお受けします。",

  fields: {
    name: { label: "お名前", placeholder: "" },
    intro: {
      label: "簡単な自己紹介",
      hint: "経歴・関心など",
    },
    message: {
      label: "お問い合わせ内容／参加を希望される理由",
      hint: "",
    },
    interest: {
      label: "関心の種類",
      hint: "当てはまるものをお選びください",
    },
  },

  /** value は /members・/partners からのリンクの ?interest= と対応させる */
  interests: [
    { value: "member-core", label: "現場メンバー〈移住・定期通い〉" },
    { value: "member-spot", label: "現場メンバー〈単発助っ人〉" },
    { value: "partner-core", label: "資金パートナー〈正規契約〉" },
    { value: "support", label: "少額・単発の支援（隕石米）" },
    { value: "project", label: "共同プロジェクト" },
    { value: "other", label: "その他" },
  ],

  submitLabel: "この内容で送る",

  aside: {
    heading: "そのほかのご案内",
    items: [
      "収穫祭・訪問のご案内",
      "資料請求（PDF）",
    ],
  },
} as const;
