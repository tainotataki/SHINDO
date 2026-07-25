import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { membersPage } from "@/content/members";

export const metadata: Metadata = {
  title: "現場メンバー募集",
  description:
    "5〜10年をかけて暮らしと社会を共につくる仲間を探しています。移住・定期通いの中核メンバー（年2〜3組）と、数日から関われる単発助っ人の2つの道。",
  alternates: { canonical: "/members" },
};

export default function MembersPage() {
  const { ways, profile, honest, mindset, living, children, recruiting, cta } = membersPage;

  return (
    <>
      <PageHero
        kicker={membersPage.kicker}
        heading={membersPage.heading}
        lead={membersPage.lead}
      />

      {/* 2つの関わり方。重い関与と軽い入口を対等に並べる */}
      <Section labelledBy={`${ways.id}-heading`} id={ways.id}>
        <Container>
          <SectionHeading id={`${ways.id}-heading`} kicker={ways.kicker}>
            {ways.heading}
          </SectionHeading>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-2">
            {ways.items.map((item) => (
              <li key={item.tag} className="flex flex-col bg-surface p-8 lg:p-10">
                <span aria-hidden className="font-mincho text-caption text-gold">
                  {item.tag}
                </span>
                <h3 className="mt-3 text-h2">{item.title}</h3>
                <p className="mt-5 flex-1 text-body text-ink/85">{item.body}</p>
                <Button href={item.cta.href} className="mt-8 self-start">
                  {item.cta.label}
                </Button>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 求める人物像 */}
      <Section tone="surface" labelledBy={`${profile.id}-heading`} id={profile.id}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${profile.id}-heading`} kicker={profile.kicker}>
              {profile.heading}
            </SectionHeading>
            <ul className="max-w-prose space-y-4">
              {profile.items.map((item) => (
                <li key={item} className="flex gap-4 border-b border-line pb-4">
                  <span aria-hidden className="mt-3.5 h-px w-4 shrink-0 bg-gold" />
                  <span className="text-body text-ink/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 正直にお伝えすること。
          期待値調整はこの募集の質を決めるので、面を反転させて読み飛ばされにくくする */}
      <Section tone="forest" labelledBy={`${honest.id}-heading`} id={honest.id}>
        <Container>
          <p className="flex items-center gap-3 text-caption tracking-[0.14em] text-base/60">
            <span aria-hidden className="h-px w-6 bg-base/50" />
            {honest.kicker}
          </p>
          <h2
            id={`${honest.id}-heading`}
            className="mt-6 max-w-[20ch] text-h1 text-base text-balance"
          >
            {honest.heading}
          </h2>
          <p className="mt-9 max-w-prose text-body text-base/80">{honest.body}</p>
        </Container>
      </Section>

      {/* ここでの心もち */}
      <Section labelledBy={`${mindset.id}-heading`} id={mindset.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${mindset.id}-heading`} kicker={mindset.kicker}>
              {mindset.heading}
            </SectionHeading>
            <p className="max-w-prose text-body text-ink/85 reveal">{mindset.body}</p>
          </div>
        </Container>
      </Section>

      {/* 暮らしと仕事／子育て環境 */}
      <Section tone="surface">
        <Container>
          <div className="space-y-section">
            {[living, children].map((block, i) => (
              <article
                key={block.id}
                id={block.id}
                className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                  <SectionHeading id={`${block.id}-heading`} kicker={block.kicker}>
                    {block.heading}
                  </SectionHeading>
                  <p className="mt-8 max-w-prose text-body text-ink/85">{block.body}</p>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
                  <PhotoSlot subject={block.photo} ratio="4/3" className="reveal" />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* 募集要項。まだ確定していないことを、空欄のまま正直に出す */}
      <Section labelledBy={`${recruiting.id}-heading`} id={recruiting.id}>
        <Container>
          <SectionHeading id={`${recruiting.id}-heading`} kicker={recruiting.kicker}>
            {recruiting.heading}
          </SectionHeading>
          <ul className="mt-10 max-w-prose space-y-4">
            {recruiting.pending.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-b border-line pb-4 text-body text-ink-muted"
              >
                <span className="shrink-0 rounded-sm border border-line px-2 py-0.5 text-[0.6875rem]">
                  準備中
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ページ末CTA。ここは2分岐が明確なので CtaBand ではなく個別に置く */}
      <Section tone="forest" labelledBy="members-cta-heading">
        <Container>
          <h2 id="members-cta-heading" className="max-w-[20ch] text-h1 text-base text-balance">
            {cta.heading}
          </h2>
          <p className="mt-6 max-w-prose text-body text-base/80">{cta.body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {ways.items.map((item) => (
              <Button
                key={item.tag}
                href={item.cta.href}
                onDark
                variant={item.tag === "A" ? "solid" : "outline"}
              >
                {item.cta.label}
              </Button>
            ))}
          </div>
          <p className="mt-8 text-caption text-base/60">
            資金で関わる道もあります。{" "}
            <Link href="/partners" className="underline underline-offset-4 hover:text-base">
              資金パートナーについて
            </Link>
          </p>
        </Container>
      </Section>
    </>
  );
}
