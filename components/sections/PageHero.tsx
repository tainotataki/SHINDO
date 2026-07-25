import type { ReactNode } from "react";
import { Container } from "@/components/ui/layout";

/**
 * 下層ページ共通の導入部。
 * どのページでも同じ位置に見出しが来ることで、読者が現在地を把握しやすくなる。
 */
export function PageHero({
  kicker,
  heading,
  lead,
  children,
}: {
  kicker: string;
  heading: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line bg-surface">
      <Container className="py-16 lg:py-24">
        <p className="flex items-center gap-3 text-caption tracking-[0.14em] text-gold">
          <span aria-hidden className="h-px w-6 bg-gold" />
          {kicker}
        </p>
        <h1 className="mt-6 max-w-[22ch] text-h1 text-balance">{heading}</h1>
        {lead && (
          <p className="mt-8 max-w-prose text-lead text-ink/85">{lead}</p>
        )}
        {children}
      </Container>
    </div>
  );
}
