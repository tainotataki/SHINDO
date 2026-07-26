import localFont from "next/font/local";

/**
 * サイト全体の書体。見出しも本文も Satsuki Gendai Mincho（皐月現代明朝）。
 *
 * 元ファイルは 16MB あるため、サイトに出てくる文字だけに絞った woff2 を置いている。
 * サブセットはコピー全体（content / components / app）から生成しているので、
 * 本文に使っても収録文字は増えず、サイズも変わらない。
 * コピーを足したら scripts/subset-font.py を再実行すること。
 * 収録外の字は Hiragino Mincho ProN 等にフォールバックする。
 *
 * ウェイトは Medium(500) の1種類。サイト内で使っているのも font-medium だけなので、
 * 偽ボールドの合成は起きない。700 を要求する指定を足さないこと。
 */
export const minchoJp = localFont({
  src: "./fonts/SatsukiGendaiMincho-subset.woff2",
  weight: "500",
  style: "normal",
  display: "swap",
  variable: "--font-mincho-jp",
  fallback: ["Hiragino Mincho ProN", "Yu Mincho", "serif"],
});
