# SHINDO

LP / コーポレートサイト。Vercel にデプロイする。

## スタック

| | | |
|---|---|---|
| Next.js | 16.x (App Router) | Active LTS。React Compiler が安定版として利用可 |
| React | 19.x | Server Components がデフォルト |
| TypeScript | 5.x | `strict: true` |
| Tailwind CSS | v4 | CSS-first。設定は `app/globals.css` の `@theme` |
| shadcn/ui | 最新 | Base UI プリミティブ上に構築 |
| パッケージ管理 | pnpm | `corepack enable pnpm` |

## 判断の基準

**Server Component がデフォルト。** `'use client'` は state / effect / イベントハンドラが要る箇所にだけ、
かつ必要な最小のコンポーネントに付ける。ページ単位で付けると LP の INP がそこで決まってしまう。

**Tailwind v4 は CSS-first。** `tailwind.config.js` は使わない。デザイントークンは
`app/globals.css` の `@theme` に定義し、そこから生成されるユーティリティだけを使う。
任意値（`mt-[37px]` `text-[#3a3a3a]`）を書きたくなったら、それはトークンが足りていない合図。

**コピーは `content/` に置く。** JSX に直接書かない。非エンジニアが探せる場所に置くため。

**375px から作る。** デスクトップから縮めると必ず壊れる。

## ディレクトリ

```
app/                    App Router
  (marketing)/          公開ページ
  globals.css           Tailwind の @theme（デザイントークンの正）
components/
  sections/             LP のセクション
  ui/                   shadcn/ui（直接編集しない）
content/                コピー・データ
.claude/
  design/art-direction.md   視覚的な意思決定の正
  skills/                   このプロジェクト用スキル
```

## スキル

| | |
|---|---|
| `/design-review` | レンダリング結果を見てデザインを講評・修正 |
| `/a11y-check` | WCAG 2.2 AA 監査 |
| `/web-vitals` | LCP / INP / CLS の計測と改善 |
| `/seo-meta` | Metadata API / OGP / 構造化データ |
| `/lp-section` | 規約に沿ったセクション追加 |
| `/ship` | 本番デプロイ前チェック |

デザインに関わる判断は [`.claude/design/art-direction.md`](.claude/design/art-direction.md) を参照する。
未記入の項目は「未決定」であり、勝手に埋めない。

## やらないこと

- `.claude/settings.local.json` をコミットする（各自のローカル設定）
- 秘密情報に `NEXT_PUBLIC_` を付ける（クライアントバンドルに埋め込まれる）
- `components/ui/` の shadcn 生成物を直接編集する（再生成で消える）
