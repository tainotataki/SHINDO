import localFont from "next/font/local";
import { Zen_Kaku_Gothic_New } from "next/font/google";

/**
 * 見出し用の明朝。「静けさと確かさ」を担当する。
 *
 * 元は 16MB あるため、サイトに出てくる文字だけに絞った woff2 を置いている。
 * コピーを足したら scripts/subset-font.py を再実行すること。
 * 収録外の文字は Hiragino Mincho ProN 等にフォールバックする。
 *
 * ウェイトは Medium(500) の1種類しかない。CSS 側で 700 を要求すると
 * ブラウザが偽ボールドを合成して明朝の骨格が濁るので、見出しは 500 で使う。
 */
export const minchoJp = localFont({
  src: "./fonts/SatsukiGendaiMincho-subset.woff2",
  weight: "500",
  style: "normal",
  display: "swap",
  variable: "--font-mincho-jp",
  fallback: ["Hiragino Mincho ProN", "Yu Mincho", "serif"],
});

/** 本文用のゴシック。実務的な読みやすさを担当する。 */
export const gothic = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-gothic",
});
