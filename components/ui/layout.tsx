import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Width = "prose" | "content" | "wide";

const widthClass: Record<Width, string> = {
  prose: "max-w-prose",
  content: "max-w-content",
  wide: "max-w-wide",
};

/** 横方向の境界だけを担当する。縦の余白は Section 側の責務。 */
export function Container({
  width = "content",
  className,
  children,
}: {
  width?: Width;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-gutter sm:px-8", widthClass[width], className)}>
      {children}
    </div>
  );
}

type Tone = "base" | "surface" | "forest";

const toneClass: Record<Tone, string> = {
  base: "",
  surface: "bg-surface",
  forest: "bg-forest text-base",
};

/**
 * 縦のリズムを一箇所に集約する。
 * labelledBy を渡すと見出しと結びつき、支援技術上でも「名前のある区画」になる。
 */
export function Section({
  tone = "base",
  labelledBy,
  id,
  className,
  children,
}: {
  tone?: Tone;
  labelledBy?: string;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-section", toneClass[tone], className)}
    >
      {children}
    </section>
  );
}

/**
 * セクション見出し。金の短い罫を上に置き、視線の起点をつくる。
 * kicker は「▍」ラベルではなく、読者に見せる小見出し。
 */
export function SectionHeading({
  id,
  kicker,
  children,
  level = 2,
  align = "left",
  className,
}: {
  id?: string;
  kicker?: string;
  children: ReactNode;
  level?: 1 | 2 | 3;
  align?: "left" | "center";
  className?: string;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  const size = level === 1 ? "text-h1" : level === 2 ? "text-h2" : "text-h3";

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {kicker && (
        <p
          className={cn(
            "mb-4 flex items-center gap-3 text-caption tracking-[0.14em] text-gold",
            align === "center" && "justify-center",
          )}
        >
          <span aria-hidden className="h-px w-6 bg-gold" />
          {kicker}
        </p>
      )}
      <Tag id={id} className={cn(size, "text-balance")}>
        {children}
      </Tag>
    </div>
  );
}

/** 本文の列。日本語で追える行長に固定する。 */
export function Prose({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("max-w-prose space-y-6 text-body text-ink/90", className)}>
      {children}
    </div>
  );
}

/** 細い区切り罫。セクション内の話題転換に使う。 */
export function Rule({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-line", className)} />;
}
