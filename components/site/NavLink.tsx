"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

/**
 * 現在地を示すためだけのクライアント境界。
 * usePathname が要るのはこの一点なので、リンク1つ分に閉じ込める。
 */
export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isCurrent = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      className={cn(
        "relative py-2 text-[0.875rem] transition-colors duration-200 ease-quiet hover:text-gold",
        isCurrent ? "text-gold" : "text-ink",
      )}
    >
      {label}
      {isCurrent && <span aria-hidden className="absolute inset-x-0 -bottom-px h-px bg-gold" />}
    </Link>
  );
}
