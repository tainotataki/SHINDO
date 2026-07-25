import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Stats } from "@/components/ui/Stat";
import { partnersPage } from "@/content/partners";

export const metadata: Metadata = {
  title: "資金パートナー",
  description:
    "寄付ではなく共創パートナーとしての参画。初年度300万〜1,000万円の正規契約と、隕石米を返礼とする少額・単発の支援。費用構造とリスクを開示しています。",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  const { ways, philosophy, cost, contract, returns, risk, involvement, cta } = partnersPage;

  return (
    <>
      <PageHero
        kicker={partnersPage.kicker}
        heading={partnersPage.heading}
        lead={partnersPage.lead}
      />

      {/* 2つの支援のかたち */}
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

          <p className="mt-8 max-w-prose border-l border-line pl-5 text-caption text-ink-muted">
            {ways.note.text}{" "}
            <a
              href={ways.note.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              <span lang="en">{ways.note.linkLabel}</span>
              <span aria-hidden> ↗</span>
              <span className="sr-only">（外部サイト・新しいタブで開きます）</span>
            </a>
          </p>
        </Container>
      </Section>

      {/* パートナーシップの考え方 */}
      <Section tone="surface" labelledBy={`${philosophy.id}-heading`} id={philosophy.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${philosophy.id}-heading`} kicker={philosophy.kicker}>
              {philosophy.heading}
            </SectionHeading>
            <p className="max-w-prose text-body text-ink/85">{philosophy.body}</p>
          </div>
        </Container>
      </Section>

      {/* 費用の全体像 */}
      <Section labelledBy={`${cost.id}-heading`} id={cost.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${cost.id}-heading`} kicker={cost.kicker}>
              {cost.heading}
            </SectionHeading>
            <p className="max-w-prose text-body text-ink/85">{cost.body}</p>
          </div>
          <Stats items={cost.breakdown} className="mt-14 reveal" />
        </Container>
      </Section>

      {/* 契約とお金の流れ */}
      <Section tone="surface" labelledBy={`${contract.id}-heading`} id={contract.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${contract.id}-heading`} kicker={contract.kicker}>
              {contract.heading}
            </SectionHeading>
            <p className="max-w-prose text-body text-ink/85">{contract.body}</p>
          </div>
        </Container>
      </Section>

      {/* 非貨幣的リターン */}
      <Section tone="forest" labelledBy={`${returns.id}-heading`} id={returns.id}>
        <Container>
          <p className="flex items-center gap-3 text-caption tracking-[0.14em] text-base/60">
            <span aria-hidden className="h-px w-6 bg-base/50" />
            {returns.kicker}
          </p>
          <h2
            id={`${returns.id}-heading`}
            className="mt-6 max-w-[20ch] text-h1 text-base text-balance"
          >
            {returns.heading}
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-sm bg-base/20 sm:grid-cols-2 lg:grid-cols-3">
            {returns.items.map((item) => (
              <li key={item} className="bg-forest px-7 py-8 text-body text-base/85">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* リスクと不確実性。隠さないことが信頼の条件なので、独立したセクションにする */}
      <Section labelledBy={`${risk.id}-heading`} id={risk.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${risk.id}-heading`} kicker={risk.kicker}>
              {risk.heading}
            </SectionHeading>
            <p className="max-w-prose border-l-2 border-gold pl-6 text-body text-ink/85">
              {risk.body}
            </p>
          </div>
        </Container>
      </Section>

      {/* 関与のカタチ */}
      <Section tone="surface" labelledBy={`${involvement.id}-heading`} id={involvement.id}>
        <Container>
          <SectionHeading id={`${involvement.id}-heading`} kicker={involvement.kicker}>
            {involvement.heading}
          </SectionHeading>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="text-h3 text-gold">関わる機会</h3>
              <ul className="mt-5 space-y-3">
                {involvement.engagements.map((item) => (
                  <li key={item} className="border-b border-line pb-3 text-body text-ink/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-h3 text-gold">共有リソース</h3>
              <ul className="mt-5 space-y-3">
                {involvement.resources.map((item) => (
                  <li key={item} className="border-b border-line pb-3 text-body text-ink/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ページ末CTA */}
      <Section tone="forest" labelledBy="partners-cta-heading">
        <Container>
          <h2 id="partners-cta-heading" className="max-w-[20ch] text-h1 text-base text-balance">
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
            現場で関わる道もあります。{" "}
            <Link href="/members" className="underline underline-offset-4 hover:text-base">
              現場メンバー募集について
            </Link>
          </p>
        </Container>
      </Section>
    </>
  );
}
