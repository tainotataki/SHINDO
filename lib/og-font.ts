/**
 * OG 画像用に、日本語フォントを「使う文字だけ」取得する。
 *
 * Satori（ImageResponse のレンダラ）は woff2 を読めないため、
 * 古いブラウザの User-Agent を送って TrueType を返してもらう。
 * text= で必要な字だけに絞るので、実際に落ちてくるのは数十 KB。
 *
 * フォントを渡さないと日本語は豆腐（□）になる。OG 画像は
 * 差し替えが効かないまま SNS にキャッシュされるので、ここは落とさない。
 */
export async function loadJapaneseFont(
  text: string,
  family = "Shippori Mincho",
  weight = 600,
): Promise<ArrayBuffer> {
  const url =
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}` +
    `&text=${encodeURIComponent(text)}`;

  const css = await fetch(url, {
    headers: {
      // TrueType を返させるための古い UA
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Version/5.1 Safari/534.30",
    },
  }).then((r) => r.text());

  const src = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!src) throw new Error(`フォントURLを取得できませんでした: ${family}`);

  return fetch(src).then((r) => r.arrayBuffer());
}
