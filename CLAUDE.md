# SHINDO

LP / コーポレートサイト。Vercel にデプロイする。

## スタック

| | | |
|---|---|---|
| Next.js | 16.2.11 (App Router) | Turbopack |
| React | 19.2.4 | Server Components がデフォルト |
| TypeScript | 5.9 | `strict: true` |
| Tailwind CSS | 4.3 | CSS-first。設定は `app/globals.css` の `@theme` |
| パッケージ管理 | pnpm 11 | Node 26 に corepack が無いので `npm i -g pnpm` |

**shadcn/ui は導入していない。** このサイトに複雑なウィジェットが無く、
`components/ui/` の 5 ファイルで足りているため。導入するなら `components/ui/` の
命名がぶつかるので、先に移動させること。

## 判断の基準

**Server Component がデフォルト。** `'use client'` は state / effect / イベントハンドラが要る箇所にだけ、
かつ必要な最小のコンポーネントに付ける。ページ単位で付けると LP の INP がそこで決まってしまう。

**Tailwind v4 は CSS-first。** `tailwind.config.js` は使わない。デザイントークンは
`app/globals.css` の `@theme` に定義し、そこから生成されるユーティリティだけを使う。
任意値（`mt-[37px]` `text-[#3a3a3a]`）を書きたくなったら、それはトークンが足りていない合図。

**コピーは `content/` に置く。** JSX に直接書かない。非エンジニアが探せる場所に置くため。
出典は掲載コピー集（Google ドキュメント）。文言を変えるときは向こうも直す。

**375px から作る。** デスクトップから縮めると必ず壊れる。

**見出しだけ `word-break: auto-phrase`。** 本文に掛けると行末が波打って読みにくくなる。

**写真は `PhotoSlot` の枠で確保してある。** `data-photo` 属性を grep すれば
差し替え箇所が全部出る。置き換え先は `next/image`（寸法明示、LCP画像のみ `priority`）。

## ディレクトリ

```
app/
  (marketing)/          公開11ページ
  actions/contact.ts    お問い合わせの Server Action
  globals.css           @theme（デザイントークンの実装）
  fonts.ts              next/font の定義
  opengraph-image.tsx   OGP画像（ビルド時生成）
  sitemap.ts robots.ts
components/
  site/                 Header / Footer / MobileNav / MobileCta
  sections/             複数ページで使うセクション
  ui/                   自前のプリミティブ（layout / Button / Card / Stat / PhotoSlot）
content/                コピー（ページごとに1ファイル）
lib/                    cn / og-font
.claude/design/art-direction.md   視覚的な意思決定の正
```

### ルート

`/` `/about` `/future` `/showa-mura` `/riku` `/experiments`
`/members` `/partners` `/team` `/journal` `/contact`

`/contact` だけ動的。`?interest=` で関心の種類を選択済みにして開くため。

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
