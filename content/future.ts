/** ページ3｜未来の考え方（世界観）。出典：掲載コピー集 ページ3 */

export const futurePage = {
  kicker: "未来の考え方",
  heading: "未来は、まだ決まっていない。",
  lead: "この先の数十年がどうなるかは、誰にも断言できません。けれど、私たちが今どこに立ち、何に備えるかによって、進む先は確かに変わります。未来を「予想する」のではなく、「選び、備える」ための地図として、ひとつの考え方を紹介します。",

  axes: {
    id: "axes",
    kicker: "2つの軸",
    heading: "経済と、自然。2つの軸で未来を見る。",
    body: "エコロジー経済学者ネイト・ヘイゲンスは、これからの世界を2つの問いで整理します。ひとつは、経済がこのまま「拡大」するのか、それとも「縮小」に向かうのか。もうひとつは、私たちの暮らしが自然の「限界の内側」に収まるのか、それを超えた「オーバーシュート（行き過ぎ）」のままなのか。この2つを掛け合わせると、4つの未来が見えてきます。",
    note: "原典では Green Growth / Mordor / The Great Simplification / Mad Max と呼ばれます。ここでは日本の読者に情景が伝わるよう、SHINDOによる意訳の呼称を用いています。",
  },

  quadrants: {
    id: "quadrants",
    kicker: "四つの未来",
    heading: "2つの軸が描く、四つの行き先。",
    /** 表の行＝経済、列＝生態系。SHINDO が備えるのは③。 */
    axisX: { inside: "自然の限界の内側", overshoot: "自然のオーバーシュート" },
    axisY: { grow: "経済は拡大", shrink: "経済は縮小" },
    items: [
      {
        index: 1,
        name: "近未来的な技術社会",
        origin: "Green Growth",
        economy: "grow",
        ecology: "inside",
        body: "技術と知恵によって、自然を壊さずに豊かさを伸ばし続ける夢。美しい理想ですが、実現のハードルは決して低くありません。",
        chosen: false,
      },
      {
        index: 2,
        name: "最後の晩餐",
        origin: "Mordor",
        economy: "grow",
        ecology: "overshoot",
        body: "自然を削りながら、繁栄の宴を続ける世界。テーブルの上は豪華でも、その料理を支える資源と生態系が、静かに失われていきます。",
        chosen: false,
      },
      {
        index: 3,
        name: "足るを知る自律分散型社会",
        origin: "The Great Simplification",
        economy: "shrink",
        ecology: "inside",
        body: "あえて歩みをゆるめ、循環を土台に据えた成熟した社会。中央に依存せず、地域ごとに自ら立ち、足るを知って豊かに暮らす。SHINDOが備えるのは、この未来です。",
        chosen: true,
      },
      {
        index: 4,
        name: "極限サバイバル",
        origin: "Mad Max",
        economy: "shrink",
        ecology: "overshoot",
        body: "備えのないまま、無秩序に崩れていく世界。力がすべてを支配する、極限の生き残り競争。私たちがもっとも避けたい未来です。",
        chosen: false,
      },
    ],
  },

  choice: {
    id: "choice",
    kicker: "私たちの選択",
    heading: "同じ「縮小」でも、道は分かれる。",
    body: "経済の拡大がいつまでも続かないとしたら、「縮小」は避けられないのかもしれません。けれど、備えなく崩れ落ちる縮小（極限サバイバル）と、意図して選びとる、循環する成熟社会（足るを知る自律分散型社会）とは、まったく別の未来です。SHINDOは後者に、悲観ではなく、創造として備えます。",
  },

  why: {
    id: "why-showa",
    kicker: "だから、昭和村",
    heading: "備えるとは、暮らしを取り戻すこと。",
    body: "食・水・住まい・エネルギー・そして人との信頼を、自分たちの手で整える。それは抽象的な思想ではなく、「足るを知る自律分散型社会」への、もっとも具体的な備えです。福島・会津の小野川は、その最初の実験場です。",
    link: { href: "/showa-mura", label: "最初の現場、昭和村・小野川構想へ" },
    external: {
      href: "https://www.thegreatsimplification.com/",
      label: "ネイト・ヘイゲンスの考えをもっと知る",
    },
  },
} as const;
