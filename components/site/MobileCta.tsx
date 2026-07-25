import Link from "next/link";
import { ctaNav } from "@/content/site";

/**
 * スマホの追従フッター（HP構成書 §5「常時到達可能に」）。
 * lg 以上ではヘッダーに同じ2つが出るため非表示。
 * body 側に pb を入れて、最後の要素がこのバーに隠れないようにしている。
 */
export function MobileCta() {
  return (
    <div className="sticky-cta fixed inset-x-0 bottom-0 z-30 border-t border-line bg-base/95 backdrop-blur-sm lg:hidden">
      <div className="grid grid-cols-2 gap-2 px-gutter py-3">
        <Link
          href={ctaNav.member.href}
          className="flex min-h-[48px] items-center justify-center rounded-sm bg-forest px-3 text-center text-[0.8125rem] font-medium leading-tight text-base"
        >
          {ctaNav.member.label}
        </Link>
        <Link
          href={ctaNav.partner.href}
          className="flex min-h-[48px] items-center justify-center rounded-sm border border-forest/35 px-3 text-center text-[0.8125rem] font-medium leading-tight text-forest"
        >
          {ctaNav.partner.label}
        </Link>
      </div>
    </div>
  );
}
