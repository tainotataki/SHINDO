import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { NumberedCard } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { rikuPage } from "@/content/riku";

export const metadata: Metadata = {
  title: "拠点「理空」",
  description:
    "会津・美里に建つSHINDO最初の拠点「理空」。会津百姓一揆をくぐり抜けた250年の古民家を、壊さずに引き継ぐ。会津の職人と2年越しで再生した、呼吸する家。",
  alternates: { canonical: "/riku" },
};

export default function RikuPage() {
  const { name, history, craft, architecture, meaning } = rikuPage;

  return (
    <>
      <PageHero
        kicker={rikuPage.kicker}
        heading={rikuPage.heading}
        lead={rikuPage.lead}
      />

      {/* 名の由来 */}
      <Section labelledBy={`${name.id}-heading`} id={name.id}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading id={`${name.id}-heading`} kicker={name.kicker}>
                {name.heading}
              </SectionHeading>
              <p className="mt-8 max-w-prose text-body text-ink/85">{name.body}</p>
            </div>
            <PhotoSlot subject={name.photo} ratio="4/3" className="reveal" />
          </div>
        </Container>
      </Section>

      {/* 引き継がれた歴史 */}
      <Section tone="surface" labelledBy={`${history.id}-heading`} id={history.id}>
        <Container>
          <SectionHeading id={`${history.id}-heading`} kicker={history.kicker}>
            {history.heading}
          </SectionHeading>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {history.items.map((item, i) => (
              <li key={item.title} className="flex">
                <NumberedCard index={i + 1} title={item.title} className="flex-1">
                  {item.body}
                </NumberedCard>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 職人と2年越しの再生 */}
      <Section labelledBy={`${craft.id}-heading`} id={craft.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${craft.id}-heading`} kicker={craft.kicker}>
              {craft.heading}
            </SectionHeading>
            <div className="max-w-prose space-y-6 text-body text-ink/85">
              {craft.paragraphs.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {craft.photos.map((photo) => (
              <PhotoSlot key={photo} subject={photo} ratio="3/2" className="reveal" />
            ))}
          </div>
        </Container>
      </Section>

      {/* 建築の特徴 */}
      <Section tone="surface" labelledBy={`${architecture.id}-heading`} id={architecture.id}>
        <Container>
          <SectionHeading id={`${architecture.id}-heading`} kicker={architecture.kicker}>
            {architecture.heading}
          </SectionHeading>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {architecture.items.map((item, i) => (
              <li key={item.title} className="flex">
                <NumberedCard index={i + 1} title={item.title} className="flex-1">
                  {item.body}
                </NumberedCard>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 場としての意義。コピー集で「濃緑の帯」と指定されている箇所 */}
      <Section tone="forest" labelledBy={`${meaning.id}-heading`} id={meaning.id}>
        <Container>
          <p className="flex items-center gap-3 text-caption tracking-[0.14em] text-base/60">
            <span aria-hidden className="h-px w-6 bg-base/50" />
            {meaning.kicker}
          </p>
          <h2
            id={`${meaning.id}-heading`}
            className="mt-6 max-w-[20ch] text-h1 text-base text-balance"
          >
            {meaning.heading}
          </h2>
          <p className="mt-9 max-w-prose text-body text-base/80">{meaning.body}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-10">
            {meaning.links.map((link) => (
              <ArrowLink key={link.href} href={link.href} onDark>
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
