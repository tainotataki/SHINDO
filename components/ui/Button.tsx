import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[0.9375rem] " +
  "font-medium transition-colors duration-200 ease-quiet min-h-[44px]";

const variants: Record<Variant, string> = {
  solid: "bg-forest text-base hover:bg-forest-deep",
  outline: "border border-forest/35 text-forest hover:border-forest hover:bg-forest/5",
};

const onDarkVariants: Record<Variant, string> = {
  solid: "bg-base text-forest hover:bg-surface",
  outline: "border border-base/40 text-base hover:border-base hover:bg-base/10",
};

export function Button({
  href,
  variant = "solid",
  onDark = false,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  onDark?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(base, onDark ? onDarkVariants[variant] : variants[variant], className)}
    >
      {children}
    </Link>
  );
}

/**
 * 本文中の「→」つきリンク。ボタンほど強くない導線に使う。
 * 矢印は aria-hidden。読み上げ時に「みぎやじるし」と言わせない。
 */
export function ArrowLink({
  href,
  onDark = false,
  className,
  children,
}: {
  href: string;
  onDark?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-baseline gap-2 text-[0.9375rem] underline-offset-[6px] hover:underline",
        onDark ? "text-base" : "text-forest",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-200 ease-quiet group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
