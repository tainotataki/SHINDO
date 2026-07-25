import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/layout";
import { contactPage } from "@/content/contact";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "現場メンバー、資金パートナー、そのほかのご関心。すべてこの一つのフォームでお受けします。移住や出資をいきなり決める必要はありません。",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  // /members・/partners の各CTAから ?interest= で飛んでくる。
  // 選択済みの状態で開くことで、入力の手間をひとつ減らす。
  const { interest } = await searchParams;
  const known = contactPage.interests.some((i) => i.value === interest);

  return (
    <>
      <PageHero
        kicker={contactPage.kicker}
        heading={contactPage.heading}
        lead={contactPage.lead}
      />

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
            <ContactForm defaultInterest={known ? interest : undefined} />

            <aside className="lg:pt-2">
              <div className="rounded-sm border border-line bg-surface p-8">
                <h2 className="text-h3">直接のご連絡</h2>
                <p className="mt-4 text-body">
                  <a
                    href={`mailto:${site.email}`}
                    className="underline underline-offset-4 hover:text-forest"
                  >
                    {site.email}
                  </a>
                </p>

                <h3 className="mt-10 text-h3">{contactPage.aside.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {contactPage.aside.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-line pb-3 text-body text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-caption text-ink-muted">
                  いずれもフォームの「お問い合わせ内容」にご記入ください。
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
