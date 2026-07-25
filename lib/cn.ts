/** クラス名の結合。条件分岐で falsy になったものを落とすだけの薄いヘルパー。 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
