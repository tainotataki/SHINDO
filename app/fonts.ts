import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";

/**
 * 見出し用の明朝。「静けさと確かさ」を担当する。
 * 日本語フォントは unicode-range で細かく分割配信されるため、
 * preload: false にして「全スライスの先読み」を防ぐ。
 * ブラウザは実際に使う字だけを取りに行く。
 */
export const minchoJp = Shippori_Mincho({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-mincho-jp",
});

/** 本文用のゴシック。実務的な読みやすさを担当する。 */
export const gothic = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-gothic",
});
