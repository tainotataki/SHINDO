# Design QA: トップページ モバイル人物写真

- Source visual truth: `/Users/kagayakikawabata/Desktop/screencapture/CleanShot 2026-08-30 at 08.52.50.png`
- Implementation screenshot: `design-qa-mobile-people-583x664.png`
- Route: `http://localhost:8765/#a-people`
- Viewport: 583 x 664 CSS px
- Source pixels: 583 x 664
- Implementation pixels: 583 x 664
- Device scale factor: 1
- State: トップページ「この場を、つくっている人たち。」の宇野宏泰カード

## Full-view comparison evidence

参照画像と実装を同一の 583 x 664 で比較した。人物写真は参照の約 326 x 407 px に対し、実装は 320 x 400 px。縦長の有機的な楕円、白い縁、右下の淡いピンクの影、顔と上半身のトリミングが一致している。カードを囲んでいたモバイル専用の四角い枠もなくなっている。

## Focused region comparison

人物写真が画面の主要領域を占め、輪郭・縁・影・トリミングをフルビューで十分に判別できるため、別の拡大クロップは不要と判断した。

## Required fidelity surfaces

- Fonts and typography: 既存の書体・サイズ・階層を維持。今回の変更による文字組みの差異なし。
- Spacing and layout rhythm: 写真幅は参照との差約 2%。写真下の役割ラベルへの余白も同等。
- Colors and visual tokens: 白い縁と `--ume-100` の淡いピンクの影が参照と一致。セクション背景色は既存のSHINDO配色を維持。
- Image quality and asset fidelity: 同じ人物写真アセットを使用し、4:5の比率と既存の焦点位置を維持。引き伸ばしや低解像度化なし。
- Copy and content: 既存文言は変更していない。

## Findings

- [P1] 修正済み: `responsive.css` のモバイル用 4:3 四角写真が、デスクトップの有機的な縦長ポートレートと不一致だった。
  - Fix: トップページの人物カードに限り、4:5、非対称の楕円、8pxの白い縁、淡いピンクの影を再適用。外側カード枠も解除。
- Remaining P0/P1/P2: なし。
- P3: 参照画像とセクション背景色・本文量は異なるが、既存のサイト配色と文言を維持するための意図的な差異。

## Comparison history

1. Before: モバイルでは写真が 4:3 の四角いタイルになり、デスクトップの人物表現と不統一。
2. Fix: `design.css` のモバイル指定を 4:5 の有機的な楕円へ変更し、四角いカード枠を削除。
3. After: 583 x 664 の同一条件で参照画像と比較。写真 320 x 400、横方向オーバーフローなし、ブラウザコンソールの error / warning は 0 件。

## Implementation checklist

- [x] 3名の人物写真を同じ有機的な楕円へ統一
- [x] 人物カードの四角い外枠を削除
- [x] 既存の画像焦点・文言・デスクトップ表示を維持
- [x] 390px と 583px のモバイル幅で確認
- [x] 横方向オーバーフローなし
- [x] コンソールエラーなし

final result: passed
