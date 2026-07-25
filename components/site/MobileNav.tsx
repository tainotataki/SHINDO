"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ctaNav, primaryNav } from "@/content/site";

/**
 * モバイルのナビゲーション。
 *
 * クライアントコンポーネントはここだけに閉じ込めている。ヘッダー全体を
 * 'use client' にするとナビ項目の文字列まで JS バンドルに載り、
 * LP の INP がそこで決まってしまうため。
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 遷移したら閉じる。開いたまま次のページに残ると迷子になるため。
  // effect ではなくレンダー中に調整する（React 推奨の「派生 state のリセット」）。
  // effect でやると一度開いたまま描画され、閉じるために再レンダーが走る。
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // 背後がスクロールすると、閉じたときに読んでいた位置を見失う
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="-mr-2 flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 px-2 text-caption"
      >
        <span aria-hidden className="flex flex-col gap-[5px]">
          <span className="block h-px w-5 bg-ink" />
          <span className="block h-px w-5 bg-ink" />
        </span>
        {open ? "閉じる" : "メニュー"}
      </button>

      {/*
        パネルは body 直下に出す。
        ヘッダーに backdrop-blur が掛かっており、filter 系のプロパティは
        position: fixed の包含ブロックを作ってしまう。ヘッダーの中に置くと
        パネルの高さがヘッダーの 64px に閉じ込められる。
      */}
      {open &&
        createPortal(
          <div
            id="mobile-nav-panel"
            ref={panelRef}
            tabIndex={-1}
            className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto border-t border-line bg-base px-gutter py-8"
          >
            <nav aria-label="メインメニュー">
              <ul className="flex flex-col">
                {primaryNav.map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="block py-4 text-h3 aria-[current=page]:text-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href={ctaNav.member.href}
                className="flex min-h-[52px] items-center justify-center rounded-sm bg-forest px-6 text-[0.9375rem] font-medium text-base"
              >
                {ctaNav.member.label}
              </Link>
              <Link
                href={ctaNav.partner.href}
                className="flex min-h-[52px] items-center justify-center rounded-sm border border-forest/35 px-6 text-[0.9375rem] font-medium text-forest"
              >
                {ctaNav.partner.label}
              </Link>
            </div>

            <p className="mt-8 text-caption text-ink-muted">
              お問い合わせは{" "}
              <Link href="/contact" className="underline underline-offset-4">
                こちら
              </Link>
            </p>
          </div>,
          document.body,
        )}
    </div>
  );
}
