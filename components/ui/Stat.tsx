import { cn } from "@/lib/cn";

export type StatItem = {
  /** 数値部分。明朝で大きく組む */
  value: string;
  /** 単位や補足。数値に続けて小さく置く */
  unit?: string;
  label: string;
};

/**
 * 数字カード。標高・積雪・人口など、現場の実在を示す値に使う。
 * 数字だけを明朝の大サイズにして、ラベルとの主従を明確にする。
 */
export function Stats({
  items,
  onDark = false,
  className,
}: {
  items: readonly StatItem[];
  onDark?: boolean;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden rounded-sm sm:grid-cols-3",
        onDark ? "bg-base/20" : "bg-line",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={cn("px-6 py-8", onDark ? "bg-forest" : "bg-surface")}
        >
          <dt
            className={cn(
              "text-caption tracking-[0.08em]",
              onDark ? "text-base/70" : "text-ink-muted",
            )}
          >
            {item.label}
          </dt>
          <dd className="mt-3 font-mincho text-[1.875rem] leading-none">
            {item.value}
            {item.unit && (
              <span className="ml-1 text-[0.9375rem] text-gold">{item.unit}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
