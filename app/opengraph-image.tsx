import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 固定サイズの画像なので、自動折り返しに任せず改行位置を決め打ちする。
// 任せると「創／り上げる」のように行末が割れる。
const headingLines = ["共に土にまみれ、共鳴し、", "氣づき、創り上げる。"];
const sub = "奥会津の小さな村から、暮らしの基盤を自分たちの手に。";

/**
 * サイト本体と同じ明朝を使う。
 * Satori は woff2 を読めないため、サブセットの ttf のほうを渡す。
 * ビルド時に静的生成されるので、ここでのファイル読み込みは実行時に走らない。
 */
async function loadMincho() {
  return readFile(
    path.join(process.cwd(), "app/fonts/SatsukiGendaiMincho-subset.ttf"),
  );
}

export default async function OpengraphImage() {
  const fontData = await loadMincho();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f2eee4",
          padding: "72px 80px",
          fontFamily: "Satsuki Gendai Mincho",
          color: "#23201c",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 48, height: 2, backgroundColor: "#856427" }} />
          <div style={{ fontSize: 24, letterSpacing: 6, color: "#856427" }}>
            {site.tagline}
          </div>
        </div>

        {/* 見出しはサムネイル表示でも読める大きさを確保する */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {headingLines.map((line) => (
              <div key={line} style={{ fontSize: 64, lineHeight: 1.42, letterSpacing: -1 }}>
                {line}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.7, color: "#5b554b" }}>{sub}</div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #ddd6c6",
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 40, letterSpacing: 14 }}>SHINDO</div>
          <div style={{ fontSize: 22, color: "#5b554b" }}>福島・会津 昭和村 小野川</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Satsuki Gendai Mincho",
          data: fontData,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
