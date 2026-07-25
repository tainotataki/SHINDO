import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** 面をひとつ持ち上げる。影ではなく罫と地色で段差をつくる。 */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("rounded-sm border border-line bg-surface p-7 sm:p-8", className)}>
      {children}
    </div>
  );
}

/**
 * 連番つきの項目。「引き継がれた歴史」「建築の特徴」など
 * 3枚組で並ぶカードに使う。番号は装飾なので読み上げから外す。
 */
export function NumberedCard({
  index,
  title,
  className,
  children,
}: {
  index: number;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card className={cn("flex flex-col gap-3", className)}>
      <span aria-hidden className="font-mincho text-caption text-gold">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="text-h3">{title}</h3>
      <div className="text-body text-ink/85">{children}</div>
    </Card>
  );
}
