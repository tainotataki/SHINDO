import { cn } from "@/lib/cn";

/**
 * 写真の入る場所。
 *
 * 現時点で写真素材がないため、意図的な「空き枠」として設計している。
 * 壊れて見えるプレースホルダは、そのまま公開されてしまう。ここでは
 * 罫と余白で組版の一部として成立させ、被写体名を控えめに添える。
 *
 * 差し替えるときは `data-photo` 属性を grep すれば全箇所見つかる。
 * 置き換え先は next/image（width/height 明示、LCP 画像のみ priority）。
 */
export function PhotoSlot({
  subject,
  ratio = "4/3",
  className,
}: {
  /** 何を撮るか。差し替え時の指示書を兼ねる */
  subject: string;
  ratio?: "4/3" | "3/2" | "16/9" | "1/1" | "3/4";
  className?: string;
}) {
  return (
    <figure
      data-photo={subject}
      className={cn("relative overflow-hidden rounded-sm bg-forest/[0.06]", className)}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(30,58,47,0.05) 0 1px, transparent 1px 9px)",
        }}
      />
      <figcaption className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-4 py-3 text-caption text-ink-muted">
        <span aria-hidden className="h-px w-4 shrink-0 bg-gold" />
        <span>写真：{subject}</span>
      </figcaption>
    </figure>
  );
}
