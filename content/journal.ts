/** ページ10｜ジャーナル（現場の記録）。出典：掲載コピー集 ページ10 */

export const journalPage = {
  kicker: "ジャーナル",
  heading: "言葉ではなく、進んでいる事実を。",
  lead: "ここは、SHINDOの現場で実際に起きていることを、そのまま記録していく場所です。うまくいったことも、まだ途中のことも。透明であることが、いちばんの誠実さだと考えています。",

  topics: {
    id: "topics",
    kicker: "扱う内容",
    heading: "記録していくこと。",
    items: [
      {
        title: "稲作の実証記録",
        body: "反収、不耕起の経過、水源の改修など、数字とともに。",
      },
      {
        title: "古民家再生の工程とコストのアーカイブ",
        body: "移住を考える方の、実際の参考資料に。",
      },
      {
        title: "エネルギー・健康などの技術検証の進捗",
        body: "確定ではなく「検証中」であることを添えて。",
      },
      {
        title: "日々の営み、季節、祭事、人の言葉",
        body: "収穫祭など、節目のレポート。",
      },
      {
        title: "年度末の収支報告",
        body: "パートナーへの透明性の柱として。",
      },
    ],
  },

  operation: {
    id: "operation",
    kicker: "運用方針",
    heading: "無理なく、続ける。",
    categories: ["食", "エネルギー", "住", "健康", "共育", "おしらせ"],
    frequency: "更新頻度は、無理なく続くことを最優先に（月1〜2本でも可）。",
  },

  /**
   * 記事はまだない。空の一覧を「準備中」として正直に見せる。
   * CMS 導入時はここを差し替える。
   */
  posts: [] as ReadonlyArray<{
    slug: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
  }>,

  emptyState: {
    heading: "最初の記録を準備しています。",
    body: "2026年の稲作の実証記録から公開していく予定です。更新のお知らせをご希望の方は、お問い合わせからご連絡ください。",
  },
} as const;
