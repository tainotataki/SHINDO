import Link from "next/link";
import { ctaNav, primaryNav, site } from "@/content/site";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/92 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-wide items-center justify-between gap-8 px-gutter sm:px-8 lg:h-20">
        <Link
          href="/"
          className="font-mincho text-[1.25rem] tracking-[0.22em] text-ink"
          aria-label={`${site.name} ホームへ`}
        >
          {site.name}
        </Link>

        <nav aria-label="メインナビゲーション" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        {/* 2つの参加導線は常時到達可能にする（HP構成書 §5） */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={ctaNav.partner.href}
            className="rounded-sm border border-forest/35 px-4 py-2.5 text-[0.8125rem] text-forest transition-colors duration-200 ease-quiet hover:border-forest hover:bg-forest/5"
          >
            {ctaNav.partner.label}
          </Link>
          <Link
            href={ctaNav.member.href}
            className="rounded-sm bg-forest px-4 py-2.5 text-[0.8125rem] text-base transition-colors duration-200 ease-quiet hover:bg-forest-deep"
          >
            {ctaNav.member.label}
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
