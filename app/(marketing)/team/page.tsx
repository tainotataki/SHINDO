import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { teamPage } from "@/content/team";

export const metadata: Metadata = {
  title: "私たち",
  description:
    "SHINDOのコアメンバーと、実践知を支える自然農法 無の会、そして会津圏の連携エコシステム。誰がこれをやっているのか。",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  const { core, support, ecosystem, stakeholders } = teamPage;

  return (
    <>
      <PageHero
        kicker={teamPage.kicker}
        heading={teamPage.heading}
        lead={teamPage.lead}
      />

      {/* コアメンバー */}
      <Section labelledBy={`${core.id}-heading`} id={core.id}>
        <Container>
          <SectionHeading id={`${core.id}-heading`} kicker={core.kicker}>
            {core.heading}
          </SectionHeading>

          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-16">
            {core.members.map((member) => (
              <li key={member.name}>
                <PhotoSlot subject={member.photo} ratio="3/4" />
                <h3 className="mt-6 text-h2">{member.name}</h3>
                <p className="mt-2 text-caption tracking-[0.1em] text-gold">{member.role}</p>
                <p className="mt-4 max-w-prose text-body text-ink/85">{member.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* サポートメンバー・無の会 */}
      <Section tone="surface" labelledBy={`${support.id}-heading`} id={support.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${support.id}-heading`} kicker={support.kicker}>
              {support.heading}
            </SectionHeading>
            <div className="max-w-prose">
              <p className="text-body text-ink/85">{support.body}</p>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {support.names.map((name) => (
                  <li
                    key={name}
                    className="rounded-sm border border-line bg-base px-4 py-2 text-caption"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 会津圏の連携 */}
      <Section labelledBy={`${ecosystem.id}-heading`} id={ecosystem.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${ecosystem.id}-heading`} kicker={ecosystem.kicker}>
              {ecosystem.heading}
            </SectionHeading>
            <p className="max-w-prose text-body text-ink/85">{ecosystem.body}</p>
          </div>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:grid-cols-4">
            {ecosystem.items.map((item) => (
              <li key={item.title} className="bg-surface px-7 py-8">
                <h3 className="text-h3">{item.title}</h3>
                <p className="mt-3 text-caption leading-relaxed text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ステークホルダー図。図版はまだないので、準備中であることを明示する */}
      <Section tone="surface" labelledBy={`${stakeholders.id}-heading`} id={stakeholders.id}>
        <Container>
          <SectionHeading id={`${stakeholders.id}-heading`} kicker={stakeholders.kicker}>
            {stakeholders.heading}
          </SectionHeading>
          <div className="mt-10 flex max-w-prose items-baseline gap-4 border-b border-line pb-4">
            <span className="shrink-0 rounded-sm border border-line px-2 py-0.5 text-[0.6875rem]">
              準備中
            </span>
            <p className="text-body text-ink-muted">{stakeholders.pending}</p>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
