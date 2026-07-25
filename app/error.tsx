"use client";

import { useEffect } from "react";
import { Container, Section } from "@/components/ui/layout";
import { site } from "@/content/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section labelledBy="error-heading">
      <Container>
        <p className="flex items-center gap-3 text-caption tracking-[0.14em] text-gold">
          <span aria-hidden className="h-px w-6 bg-gold" />
          エラー
        </p>
        <h1 id="error-heading" className="mt-6 max-w-[20ch] text-h1 text-balance">
          ページを表示できませんでした。
        </h1>
        <p className="mt-8 max-w-prose text-body text-ink/85">
          一時的な不具合の可能性があります。お手数ですが、もう一度お試しください。
          繰り返し表示される場合は{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>{" "}
          までお知らせいただけると助かります。
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-10 inline-flex min-h-[44px] items-center justify-center rounded-sm bg-forest px-6 py-3.5 text-[0.9375rem] font-medium text-base transition-colors duration-200 ease-quiet hover:bg-forest-deep"
        >
          もう一度読み込む
        </button>
      </Container>
    </Section>
  );
}
