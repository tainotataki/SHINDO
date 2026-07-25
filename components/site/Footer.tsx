import Link from "next/link";
import { footerNav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-base/85">
      <div className="mx-auto w-full max-w-wide px-gutter py-16 sm:px-8 lg:py-20">
        <p className="font-mincho text-h2 text-base">{site.tagline}</p>

        <div className="mt-12 grid gap-10 border-t border-base/15 pt-10 sm:grid-cols-[1fr_auto] sm:gap-16">
          <nav aria-label="フッターナビゲーション">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3.5 sm:grid-cols-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.875rem] underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-[0.875rem]">
            <p className="text-base/60">お問い合わせ</p>
            <p className="mt-2">
              <a
                href={`mailto:${site.email}`}
                className="underline underline-offset-4 hover:text-base"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-base/15 pt-8 text-caption text-base/55">
          <p>
            発行：{site.publisher} ／ {site.copublisher}
          </p>
          <p>
            <span lang="en">&copy; {new Date().getFullYear()} ZEN-BU Inc.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
