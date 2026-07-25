import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { experimentsPage } from "@/content/experiments";

export const metadata: Metadata = {
  title: "4つの実験",
  description:
    "自然環境の活性化、農法実験、パートナー共創、教育。新しい文化と社会を生み出すための4つの相補的な実験と、2025年までの実績。",
  alternates: { canonical: "/experiments" },
};

export default function ExperimentsPage() {
  return (
    <>
      <PageHero
        kicker={experimentsPage.kicker}
        heading={experimentsPage.heading}
        lead={experimentsPage.lead}
      />

      {/* 4つの実験。左右の配置を交互にして、同じ形の繰り返しに見せない */}
      {experimentsPage.items.map((item, i) => (
        <Section
          key={item.id}
          id={item.id}
          tone={i % 2 === 0 ? "base" : "surface"}
          labelledBy={`${item.id}-heading`}
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                <SectionHeading id={`${item.id}-heading`} kicker={item.kicker}>
                  {item.heading}
                </SectionHeading>
                <p className="mt-8 max-w-prose text-body text-ink/85">{item.body}</p>

                {item.points.length > 0 && (
                  <ul className="mt-10 space-y-5 border-t border-line pt-8">
                    {item.points.map((point) => (
                      <li key={point.slice(0, 16)} className="flex gap-4">
                        <span aria-hidden className="mt-3.5 h-px w-4 shrink-0 bg-gold" />
                        <span className="max-w-prose text-body text-ink/85">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
                <PhotoSlot subject={item.photo} ratio="4/3" className="reveal lg:sticky lg:top-28" />
              </div>
            </div>
          </Container>
        </Section>
      ))}

      {/* 5つ目の領域 */}
      <Section tone="forest">
        <Container>
          <p className="max-w-prose text-body text-base/85">{experimentsPage.fifth.body}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-10">
            {experimentsPage.fifth.links.map((link) => (
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
