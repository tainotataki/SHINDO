import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { aboutPage } from "@/content/about";

export const metadata: Metadata = {
  title: "SHINDOとは",
  description:
    "なぜ、いま。食・エネルギー・住・学び・支え合う力を外へ預けてきた80年を振り返り、これを危機ではなく大転換期として捉える——SHINDOの思想の核。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { sections, essence, notDoing, closing } = aboutPage;

  return (
    <>
      <PageHero
        kicker={aboutPage.kicker}
        heading={aboutPage.heading}
        lead={aboutPage.lead}
      />

      {/* 思想の展開。1セクション＝1つの主張に絞り、読み進む速度を一定に保つ */}
      <Section>
        <Container>
          <div className="space-y-section">
            {sections.map((section, i) => (
              <article
                key={section.id}
                id={section.id}
                className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
              >
                <SectionHeading id={`${section.id}-heading`} kicker={section.kicker}>
                  {section.heading}
                </SectionHeading>
                <div className="max-w-prose reveal">
                  <p className="text-body text-ink/85">{section.body}</p>
                  {i === 1 && (
                    <PhotoSlot
                      subject="手放された田畑と、雪解けの沢"
                      ratio="16/9"
                      className="mt-10"
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* SHINDOの本質。サイト全体でいちばん強く言い切る箇所なので、面を反転させる */}
      <Section tone="forest" labelledBy={`${essence.id}-heading`} id={essence.id}>
        <Container>
          <p className="flex items-center gap-3 text-caption tracking-[0.14em] text-base/60">
            <span aria-hidden className="h-px w-6 bg-base/50" />
            {essence.kicker}
          </p>
          <h2
            id={`${essence.id}-heading`}
            className="mt-6 max-w-[20ch] text-h1 text-base text-balance"
          >
            {essence.heading}
          </h2>
          <div className="mt-9 max-w-prose space-y-6 text-body text-base/80">
            <p>{essence.body}</p>
            <p className="border-l-2 border-gold pl-6 font-medium text-base">
              {essence.emphasis}
            </p>
            <p>{essence.tail}</p>
          </div>
        </Container>
      </Section>

      {/* しないこと。輪郭を「何をしないか」で示す、構想の要のセクション */}
      <Section tone="surface" labelledBy={`${notDoing.id}-heading`} id={notDoing.id}>
        <Container>
          <SectionHeading id={`${notDoing.id}-heading`} kicker={notDoing.kicker}>
            {notDoing.heading}
          </SectionHeading>
          <p className="mt-8 max-w-prose text-body text-ink/85">{notDoing.lead}</p>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2">
            {notDoing.items.map((item) => (
              <li key={item.title} className="bg-surface p-8">
                <h3 className="text-h3 text-forest">{item.title}</h3>
                <p className="mt-4 text-body text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 結び */}
      <Section labelledBy={`${closing.id}-heading`} id={closing.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${closing.id}-heading`} kicker={closing.kicker}>
              {closing.heading}
            </SectionHeading>
            <div className="max-w-prose">
              <p className="text-body text-ink/85">{closing.body}</p>
              <div className="mt-10 flex flex-col gap-4">
                {closing.links.map((link) => (
                  <ArrowLink key={link.href} href={link.href}>
                    {link.label}
                  </ArrowLink>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
