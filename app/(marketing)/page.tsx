import { CtaBand } from "@/components/sections/CtaBand";
import { JoinCards } from "@/components/sections/JoinCards";
import { ArrowLink, Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Stats } from "@/components/ui/Stat";
import {
  aboutSummary,
  experimentsSummary,
  futureTeaser,
  hero,
  journalTeaser,
  livingOs,
  nowHappening,
  rikuSummary,
  villageSummary,
  vision,
} from "@/content/home";
import { ctaNav } from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* ---------- ヒーロー ----------
          中央揃えの定番構図を避け、左揃えの非対称にしている。
          見出しは Server Component のまま素の HTML として出るので、
          JS を待たずに最初のペイントに乗る（LCP 対策）。 */}
      <section aria-labelledby="hero-heading" className="border-b border-line">
        <Container className="py-16 lg:py-28">
          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-caption tracking-[0.14em] text-gold">
                <span aria-hidden className="h-px w-8 bg-gold" />
                {hero.kicker}
              </p>

              <h1
                id="hero-heading"
                className="mt-8 max-w-[16ch] text-display text-balance"
              >
                {hero.heading}
              </h1>

              <p className="mt-9 max-w-prose text-lead text-ink/85">{hero.lead}</p>

              <div className="mt-11 flex flex-col gap-3 sm:flex-row">
                <Button href={ctaNav.member.href}>{ctaNav.member.label}</Button>
                <Button href={ctaNav.partner.href} variant="outline">
                  {ctaNav.partner.label}
                </Button>
              </div>
            </div>

            <div className="lg:pb-2">
              <PhotoSlot subject="博士山の西麓、小野川の集落" ratio="3/4" />
            </div>
          </div>

          <p className="mt-16 flex items-center gap-3 text-caption text-ink-muted">
            {hero.scrollHint}
            <span aria-hidden>↓</span>
          </p>
        </Container>
      </section>

      {/* ---------- いま、何が起きているのか ---------- */}
      <Section labelledBy="now-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id="now-heading" kicker={nowHappening.kicker}>
              {nowHappening.heading}
            </SectionHeading>
            <p className="max-w-prose text-body text-ink/85 reveal">
              {nowHappening.body}
            </p>
          </div>
        </Container>
      </Section>

      {/* ---------- SHINDOとは（要約） ---------- */}
      <Section tone="surface" labelledBy="about-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id="about-heading" kicker={aboutSummary.kicker}>
              {aboutSummary.heading}
            </SectionHeading>
            <div className="max-w-prose reveal">
              <p className="text-body text-ink/85">{aboutSummary.body}</p>
              <ArrowLink href={aboutSummary.link.href} className="mt-8">
                {aboutSummary.link.label}
              </ArrowLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- 昭和村・小野川という山里 ---------- */}
      <Section labelledBy="village-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading id="village-heading" kicker={villageSummary.kicker}>
                {villageSummary.heading}
              </SectionHeading>
              <p className="mt-8 max-w-prose text-body text-ink/85">
                {villageSummary.body}
              </p>
              <ArrowLink href={villageSummary.link.href} className="mt-8">
                {villageSummary.link.label}
              </ArrowLink>
            </div>
            <PhotoSlot subject="雪に沈む冬の小野川" ratio="4/3" className="reveal" />
          </div>

          <Stats items={villageSummary.stats} className="mt-14 reveal" />
        </Container>
      </Section>

      {/* ---------- 暮らしのOS 5領域 ---------- */}
      <Section tone="surface" labelledBy="os-heading">
        <Container>
          <SectionHeading id="os-heading" kicker={livingOs.kicker}>
            暮らしを動かす、5つの土台。
          </SectionHeading>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:grid-cols-5">
            {livingOs.items.map((item) => (
              <li key={item.name} className="bg-surface px-6 py-8">
                <h3 className="font-mincho text-[1.375rem]">{item.name}</h3>
                <p className="mt-3 text-caption leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------- 4つの実験 ---------- */}
      <Section labelledBy="experiments-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id="experiments-heading" kicker={experimentsSummary.kicker}>
              {experimentsSummary.heading}
            </SectionHeading>
            <div className="max-w-prose reveal">
              <p className="text-body text-ink/85">{experimentsSummary.body}</p>
              <ArrowLink href={experimentsSummary.link.href} className="mt-8">
                {experimentsSummary.link.label}
              </ArrowLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- 拠点「理空」 ---------- */}
      <Section tone="surface" labelledBy="riku-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <PhotoSlot subject="拠点「理空」天然土壁の室内" ratio="4/3" className="reveal" />
            <div>
              <SectionHeading id="riku-heading" kicker={rikuSummary.kicker}>
                {rikuSummary.heading}
              </SectionHeading>
              <p className="mt-8 max-w-prose text-body text-ink/85">{rikuSummary.body}</p>
              <ArrowLink href={rikuSummary.link.href} className="mt-8">
                {rikuSummary.link.label}
              </ArrowLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- 2つの関わり方 ---------- */}
      <JoinCards />

      {/* ---------- 私たちが描くもの ---------- */}
      <Section tone="forest" labelledBy="vision-heading">
        <Container>
          <p className="flex items-center gap-3 text-caption tracking-[0.14em] text-base/60">
            <span aria-hidden className="h-px w-6 bg-base/50" />
            {vision.kicker}
          </p>
          <h2 id="vision-heading" className="mt-6 max-w-[20ch] text-h1 text-base text-balance">
            {vision.heading}
          </h2>
          <p className="mt-9 max-w-prose text-body text-base/80">{vision.body}</p>
        </Container>
      </Section>

      {/* ---------- 未来の考え方への招待 ---------- */}
      <Section labelledBy="future-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id="future-heading" kicker={futureTeaser.kicker}>
              {futureTeaser.heading}
            </SectionHeading>
            <div className="max-w-prose reveal">
              <p className="text-body text-ink/85">{futureTeaser.body}</p>
              <ArrowLink href={futureTeaser.link.href} className="mt-8">
                {futureTeaser.link.label}
              </ArrowLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- 最新の動き ---------- */}
      <Section tone="surface" labelledBy="journal-heading">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="journal-heading" kicker={journalTeaser.kicker}>
              {journalTeaser.heading}
            </SectionHeading>
            <ArrowLink href={journalTeaser.link.href}>{journalTeaser.link.label}</ArrowLink>
          </div>
          <p className="mt-8 max-w-prose text-body text-ink/85">{journalTeaser.body}</p>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
