import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { waysToJoin } from "@/content/home";

/**
 * 2つの参加導線を左右対称に並べる。
 *
 * 「対等に並べる」ことが HP構成書 §5 の明示要件。どちらかを大きくすると
 * 「本命はこっち」という意図しないメッセージが出るため、幅も強さも揃える。
 */
export function JoinCards({ tone = "base" }: { tone?: "base" | "surface" }) {
  return (
    <Section tone={tone} labelledBy="join-heading">
      <Container>
        <SectionHeading id="join-heading" kicker={waysToJoin.kicker}>
          {waysToJoin.heading}
        </SectionHeading>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-2">
          {waysToJoin.cards.map((card) => (
            <li key={card.href} className="flex flex-col bg-surface p-8 lg:p-10">
              <h3 className="text-h2">{card.title}</h3>
              <p className="mt-5 flex-1 text-body text-ink/85">{card.body}</p>
              <Link
                href={card.href}
                className="group mt-8 inline-flex min-h-[44px] items-center gap-2 self-start rounded-sm bg-forest px-6 py-3.5 text-[0.9375rem] font-medium text-base transition-colors duration-200 ease-quiet hover:bg-forest-deep"
              >
                {card.label}
                <span
                  aria-hidden
                  className="transition-transform duration-200 ease-quiet group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
