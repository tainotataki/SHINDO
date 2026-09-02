# SHINDO 公式サイト

千年の森を育む農業のカタチを共創する SHINDO の公式ウェブサイト（静的サイト）。

## 構成

| ファイル | 内容 |
|---|---|
| `index.html` | トップページ |
| `about.html` | SHINDOについて |
| `people.html` | メンバー紹介 |
| `projects.html` | プロジェクト一覧 |
| `partnership.html` | パートナーシップ |
| `recruit.html` | 採用・募集 |
| `privacy-policy.html` | プライバシーポリシー |
| `design.css` | 全ページ共通のデザイン・レイアウト |
| `home.css` | トップページ専用のレイアウト・レスポンシブ対応 |
| `home-playful.css` | トップページの追加ビジュアル・インタラクション |
| `report.css` | 全ページ共通の報告書調エディトリアルデザイン |
| `home-report.css` | トップページの報告書調レイアウトとファーストビュー直後の写真表示 |
| `design.js` | 共通UIと装飾の生成 |
| `responsive.css` | レスポンシブ対応スタイル |
| `tests/ui-regression.test.mjs` | 初期表示、プロジェクトタブ、報告書調レイアウトの回帰テスト |
| `zenbu-r7.pdf` | 令和7年度 活動報告書 |

画像はすべてリポジトリ直下にフラットに配置。各HTMLからは相対パスで参照している。

## ローカルでの確認

```bash
python3 -m http.server 8765
```

http://localhost:8765 を開く。

回帰テストは Node.js の標準テストランナーで実行する。

```bash
node --test tests/ui-regression.test.mjs
```

## デプロイ

Vercel の静的サイトとして公開。ビルド工程は不要（設定なしでそのまま配信される）。

## 関連ドキュメント

- [トップページのモバイル人物写真 Design QA](design-qa.md)
