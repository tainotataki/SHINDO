import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { futurePage } from "@/content/future";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "未来の考え方",
  description:
    "経済（拡大／縮小）× 自然（限界の内側／オーバーシュート）の2軸で描く四つの未来。SHINDOが備えるのは「足るを知る自律分散型社会」です。",
  alternates: { canonical: "/future" },
};

export default function FuturePage() {
  const { axes, quadrants, choice, why } = futurePage;

  return (
    <>
      <PageHero
        kicker={futurePage.kicker}
        heading={futurePage.heading}
        lead={futurePage.lead}
      />

      {/* 2つの軸 */}
      <Section labelledBy={`${axes.id}-heading`} id={axes.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${axes.id}-heading`} kicker={axes.kicker}>
              {axes.heading}
            </SectionHeading>
            <div className="max-w-prose">
              <p className="text-body text-ink/85">{axes.body}</p>
              <p className="mt-8 border-l border-line pl-5 text-caption text-ink-muted">
                {axes.note}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 四つの未来。
          2×2 の図だが、各カードが自分の座標を文章で持っているため、
          モバイルで1列に落ちても意味が失われない。軸ラベルは装飾として扱う。 */}
      <Section tone="surface" labelledBy={`${quadrants.id}-heading`} id={quadrants.id}>
        <Container>
          <SectionHeading id={`${quadrants.id}-heading`} kicker={quadrants.kicker}>
            {quadrants.heading}
          </SectionHeading>

          <div className="mt-12 lg:grid lg:grid-cols-[auto_1fr] lg:gap-5">
            {/* 縦軸ラベル（デスクトップのみ） */}
            <div
              aria-hidden
              className="hidden flex-col justify-around pt-14 text-caption tracking-[0.14em] text-ink-muted lg:flex"
            >
              <span className="[writing-mode:vertical-rl]">{quadrants.axisY.grow}</span>
              <span className="[writing-mode:vertical-rl]">{quadrants.axisY.shrink}</span>
            </div>

            <div>
              {/* 横軸ラベル（デスクトップのみ） */}
              <div
                aria-hidden
                className="mb-4 hidden grid-cols-2 gap-5 text-caption tracking-[0.14em] text-ink-muted lg:grid"
              >
                <span>{quadrants.axisX.inside}</span>
                <span>{quadrants.axisX.overshoot}</span>
              </div>

              <ul className="grid gap-5 sm:grid-cols-2">
                {quadrants.items.map((item) => (
                  <li
                    key={item.index}
                    className={cn(
                      "flex flex-col rounded-sm border p-7 lg:p-8",
                      item.chosen
                        ? "border-forest bg-forest text-base"
                        : "border-line bg-base",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={cn(
                          "font-mincho text-caption",
                          item.chosen ? "text-base/70" : "text-gold",
                        )}
                      >
                        {String(item.index).padStart(2, "0")}
                      </span>
                      {item.chosen && (
                        <span className="rounded-sm border border-base/40 px-2.5 py-1 text-[0.6875rem] tracking-wider">
                          SHINDOが備える未来
                        </span>
                      )}
                    </div>

                    <h3 className={cn("mt-4 text-h2", item.chosen && "text-base")}>
                      {item.name}
                    </h3>

                    <p
                      className={cn(
                        "mt-3 text-caption",
                        item.chosen ? "text-base/65" : "text-ink-muted",
                      )}
                    >
                      {item.economy === "grow"
                        ? quadrants.axisY.grow
                        : quadrants.axisY.shrink}
                      {" × "}
                      {item.ecology === "inside"
                        ? quadrants.axisX.inside
                        : quadrants.axisX.overshoot}
                    </p>

                    <p
                      className={cn(
                        "mt-5 flex-1 text-body",
                        item.chosen ? "text-base/85" : "text-ink/85",
                      )}
                    >
                      {item.body}
                    </p>

                    <p
                      className={cn(
                        "mt-6 border-t pt-4 text-caption",
                        item.chosen
                          ? "border-base/20 text-base/55"
                          : "border-line text-ink-muted",
                      )}
                    >
                      原典：<span lang="en">{item.origin}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 私たちの選択 */}
      <Section labelledBy={`${choice.id}-heading`} id={choice.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${choice.id}-heading`} kicker={choice.kicker}>
              {choice.heading}
            </SectionHeading>
            <p className="max-w-prose text-body text-ink/85 reveal">{choice.body}</p>
          </div>
        </Container>
      </Section>

      {/* だから、昭和村 */}
      <Section tone="surface" labelledBy={`${why.id}-heading`} id={why.id}>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading id={`${why.id}-heading`} kicker={why.kicker}>
              {why.heading}
            </SectionHeading>
            <div className="max-w-prose">
              <p className="text-body text-ink/85">{why.body}</p>
              <div className="mt-10 flex flex-col gap-4">
                <ArrowLink href={why.link.href}>{why.link.label}</ArrowLink>
                <a
                  href={why.external.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-2 text-[0.9375rem] text-forest underline-offset-[6px] hover:underline"
                >
                  {why.external.label}
                  <span aria-hidden>↗</span>
                  <span className="sr-only">（外部サイト・新しいタブで開きます）</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
