import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/layout";
import { ctaNav } from "@/content/site";

/**
 * 各ページ末の締め。2つの参加導線をここでもう一度出す。
 * 読み終えた直後がいちばん動く瞬間なので、スクロールし直させない。
 */
export function CtaBand({
  heading = "この村に、関わる。",
  body = "移住や出資を、いきなり決める必要はありません。「少し気になる」で十分です。",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <Section tone="forest" labelledBy="cta-band-heading">
      <Container>
        <div className="max-w-prose">
          <h2 id="cta-band-heading" className="text-h1 text-base">
            {heading}
          </h2>
          <p className="mt-6 text-body text-base/80">{body}</p>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={ctaNav.member.href} onDark>
            {ctaNav.member.label}
          </Button>
          <Button href={ctaNav.partner.href} variant="outline" onDark>
            {ctaNav.partner.label}
          </Button>
          <Button href="/contact" variant="outline" onDark>
            まず話を聞いてみる
          </Button>
        </div>
      </Container>
    </Section>
  );
}
