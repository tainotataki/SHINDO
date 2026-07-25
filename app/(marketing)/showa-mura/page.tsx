import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { NumberedCard } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Stats } from "@/components/ui/Stat";
import { showaMuraPage } from "@/content/showa-mura";

export const metadata: Metadata = {
  title: "昭和村・小野川構想",
  description:
    "標高約700m、人口約80人の限界集落・小野川。土地の条件、暮らしのOS5領域、2026年に実践する3つの取り組みと2030年ビジョン。",
  alternates: { canonical: "/showa-mura" },
};

export default function ShowaMuraPage() {
  const { why, land, potential, farming, livingOs, actions2026 } = showaMuraPage;

  return (
    <>
      <PageHero
        kicker={showaMuraPage.kicker}
        heading={showaMuraPage.heading}
        lead={showaMuraPage.lead}
      />

      {/* なぜ小野川か */}
      <Section labelledBy={`${why.id}-heading`} id={why.id}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading id={`${why.id}-heading`} kicker={why.kicker}>
                {why.heading}
              </SectionHeading>
              <p className="mt-8 max-w-prose text-body text-ink/85">{why.body}</p>
            </div>
            <PhotoSlot subject="耕作放棄された田と、その先の集落" ratio="4/3" className="reveal" />
          </div>
        </Container>
      </Section>

      {/* 土地の条件。数字は「見て納得する」ための材料なので、本文の直後に置く */}
      <Section tone="surface" labelledBy={`${land.id}-heading`} id={land.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${land.id}-heading`} kicker={land.kicker}>
              {land.heading}
            </SectionHeading>
            <p className="max-w-prose text-body text-ink/85">{land.body}</p>
          </div>
          <Stats items={land.stats} className="mt-14 reveal" />
        </Container>
      </Section>

      {/* ポテンシャルと農業モデル */}
      <Section>
        <Container>
          <div className="space-y-section">
            {[potential, farming].map((block) => (
              <article
                key={block.id}
                id={block.id}
                className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
              >
                <SectionHeading id={`${block.id}-heading`} kicker={block.kicker}>
                  {block.heading}
                </SectionHeading>
                <p className="max-w-prose text-body text-ink/85 reveal">{block.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* 2030年ビジョン：暮らしのOS */}
      <Section tone="forest" labelledBy={`${livingOs.id}-heading`} id={livingOs.id}>
        <Container>
          <p className="flex items-center gap-3 text-caption tracking-[0.14em] text-base/60">
            <span aria-hidden className="h-px w-6 bg-base/50" />
            {livingOs.kicker}
          </p>
          <h2
            id={`${livingOs.id}-heading`}
            className="mt-6 max-w-[20ch] text-h1 text-base text-balance"
          >
            {livingOs.heading}
          </h2>
          <p className="mt-9 max-w-prose text-body text-base/80">{livingOs.lead}</p>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-sm bg-base/20 sm:grid-cols-2 lg:grid-cols-3">
            {livingOs.items.map((item) => (
              <li key={item.name} className="bg-forest px-7 py-8">
                <h3 className="font-mincho text-[1.5rem] text-base">{item.name}</h3>
                <p className="mt-4 text-caption leading-relaxed text-base/75">{item.body}</p>
              </li>
            ))}
          </ul>

          {/* 誠実さがこのページの信頼を支える。注記は目立つ位置に置く */}
          <p className="mt-10 max-w-prose border-l-2 border-gold pl-5 text-caption text-base/70">
            {livingOs.note}
          </p>
        </Container>
      </Section>

      {/* 2026年、3つの取り組み */}
      <Section labelledBy={`${actions2026.id}-heading`} id={actions2026.id}>
        <Container>
          <SectionHeading id={`${actions2026.id}-heading`} kicker={actions2026.kicker}>
            {actions2026.heading}
          </SectionHeading>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {actions2026.items.map((item, i) => (
              <li key={item.title} className="flex">
                <NumberedCard index={i + 1} title={item.title} className="flex-1">
                  {item.body}
                </NumberedCard>
              </li>
            ))}
          </ul>

          <p className="mt-14 max-w-prose border-l-2 border-line pl-6 text-body italic text-ink-muted">
            {actions2026.aside}
          </p>

          <div className="mt-12 flex flex-col gap-4">
            {actions2026.links.map((link) => (
              <ArrowLink key={link.href} href={link.href}>
                {link.label}
              </ArrowLink>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
