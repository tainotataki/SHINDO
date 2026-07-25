/**
 * サイト全体で共有する定数。
 * 文言の出典：SHINDO 公式サイト 掲載コピー集（2026-07-18）
 */

export const site = {
  name: "SHINDO",
  tagline: "新しい豊かさへと続く道をつくる。",
  description:
    "奥会津の小さな村から、暮らしの基盤を自分たちの手に取り戻す。食・水・住まい・エネルギー・信頼を共に整える共同整作場を、福島・昭和村小野川で起ち上げています。共に創る仲間とパートナーを募集中。",
  email: "official@zen-bu.co",
  publisher: "株式会社ZEN-BU",
  copublisher: "自然農法 無の会",
  /**
   * 正規URL。canonical・OGP の絶対URL・sitemap・JSON-LD の基準になる。
   *
   * Vercel では NEXT_PUBLIC_SITE_URL に本番ドメインを入れる。
   * NEXT_PUBLIC_ を付けているのは、この値が公開情報であり、
   * かつクライアント側から参照しても破綻しないようにするため。
   * 未設定なら下の既定値になるので、ドメイン確定後は必ず設定すること。
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shindo.zen-bu.co",
} as const;

export type NavItem = { href: string; label: string };

/** グローバルナビ（HP構成書の主要6項目） */
export const primaryNav: NavItem[] = [
  { href: "/about", label: "SHINDOとは" },
  { href: "/future", label: "未来の考え方" },
  { href: "/showa-mura", label: "昭和村構想" },
  { href: "/experiments", label: "4つの実験" },
  { href: "/team", label: "私たち" },
  { href: "/journal", label: "ジャーナル" },
];

/** 常時到達可能にする2つの参加導線 */
export const ctaNav = {
  member: { href: "/members", label: "現場メンバーになる" },
  partner: { href: "/partners", label: "パートナーになる" },
} as const;

/** フッター用。ナビに載せない下層ページを含む */
export const footerNav: NavItem[] = [
  ...primaryNav,
  { href: "/riku", label: "拠点「理空」" },
  { href: "/members", label: "現場メンバー募集" },
  { href: "/partners", label: "資金パートナー" },
  { href: "/contact", label: "お問い合わせ" },
];
