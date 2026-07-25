import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { journalPage } from "@/content/journal";

export const metadata: Metadata = {
  title: "ジャーナル",
  description:
    "稲作の実証記録、古民家再生の工程とコスト、技術検証の進捗、年度末の収支報告。SHINDOの現場で実際に起きていることを、そのまま記録していきます。",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const { topics, operation, posts, emptyState } = journalPage;

  return (
    <>
      <PageHero
        kicker={journalPage.kicker}
        heading={journalPage.heading}
        lead={journalPage.lead}
      />

      {/* 記事一覧。まだ0件なので、空であることを隠さず伝える */}
      <Section labelledBy="posts-heading">
        <Container>
          <SectionHeading id="posts-heading" kicker="記録">
            {posts.length > 0 ? "最新の記録" : emptyState.heading}
          </SectionHeading>

          {posts.length === 0 ? (
            <p className="mt-8 max-w-prose text-body text-ink/85">{emptyState.body}</p>
          ) : (
            <ul className="mt-12 grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug} className="bg-surface p-8">
                  <p className="text-caption tracking-[0.1em] text-gold">{post.category}</p>
                  <h3 className="mt-3 text-h3">{post.title}</h3>
                  <p className="mt-3 text-caption text-ink-muted">
                    <time dateTime={post.date}>{post.date}</time>
                  </p>
                  <p className="mt-4 text-body text-ink/85">{post.excerpt}</p>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      {/* 扱う内容 */}
      <Section tone="surface" labelledBy={`${topics.id}-heading`} id={topics.id}>
        <Container>
          <SectionHeading id={`${topics.id}-heading`} kicker={topics.kicker}>
            {topics.heading}
          </SectionHeading>

          <ul className="mt-12 max-w-content divide-y divide-line border-y border-line">
            {topics.items.map((item) => (
              <li key={item.title} className="grid gap-2 py-6 sm:grid-cols-[1fr_1.2fr] sm:gap-10">
                <h3 className="text-h3">{item.title}</h3>
                <p className="text-body text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 運用方針 */}
      <Section labelledBy={`${operation.id}-heading`} id={operation.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${operation.id}-heading`} kicker={operation.kicker}>
              {operation.heading}
            </SectionHeading>
            <div className="max-w-prose">
              <p className="text-caption tracking-[0.1em] text-ink-muted">カテゴリ</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {operation.categories.map((category) => (
                  <li
                    key={category}
                    className="rounded-sm border border-line bg-surface px-4 py-2 text-caption"
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-body text-ink/85">{operation.frequency}</p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
