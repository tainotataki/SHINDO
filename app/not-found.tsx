import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/layout";

export default function NotFound() {
  return (
    <Section labelledBy="notfound-heading">
      <Container>
        <p className="flex items-center gap-3 text-caption tracking-[0.14em] text-gold">
          <span aria-hidden className="h-px w-6 bg-gold" />
          404
        </p>
        <h1 id="notfound-heading" className="mt-6 max-w-[20ch] text-h1 text-balance">
          お探しのページは見つかりませんでした。
        </h1>
        <p className="mt-8 max-w-prose text-body text-ink/85">
          移動または削除された可能性があります。トップページから、あらためてお探しください。
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/">トップへ戻る</Button>
          <Button href="/contact" variant="outline">
            お問い合わせ
          </Button>
        </div>
      </Container>
    </Section>
  );
}
