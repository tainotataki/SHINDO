---
name: lp-section
description: Builds a new landing-page or corporate-site section — hero, features, pricing, testimonials, FAQ, CTA, company profile, contact form — following SHINDO's art direction and this project's file conventions. Use whenever the user asks to add, build, or scaffold a section, block, or area of a page, or names a section type directly ("ヒーロー作って", "料金表を追加", "お問い合わせフォーム"). Also use when restructuring an existing page into sections.
allowed-tools: Read, Grep, Glob, Edit, Write, Bash
argument-hint: [section-type]
---

# Build an LP section

Sections written one at a time without shared rules drift: each gets its own padding, its own heading size, its own container width. By the third one the page reads as three pages. This skill exists to keep that from happening.

## Before writing

1. Read [`.claude/design/art-direction.md`](../../design/art-direction.md) for type scale, spacing, color, and motion.
2. Read one or two existing sections in `components/sections/` and match them. The conventions in the code win over the ones described here — this file describes the intent, the code is the current truth.
3. Confirm what the section is *for*. A features grid that exists because LPs have features grids is filler. Ask what the visitor should understand or do after reading it, and let that decide the structure.

## Conventions

```
components/sections/<SectionName>.tsx   セクション本体
components/ui/                          shadcn/ui プリミティブ（直接編集しない）
app/(marketing)/page.tsx                セクションを並べる場所
content/<section>.ts                    コピーとデータ（表示から分離）
```

- **Server Component by default.** Add `'use client'` only when the section needs state, effects, or event handlers, and put it on the smallest child that needs it — not the section. Shipping the whole section to the client for one accordion is the most common cause of a slow LP.
- **Copy lives in `content/`.** Text belongs where a non-engineer can find it, and it keeps JSX readable.
- **Tailwind v4 theme tokens only.** Use `text-display`, `bg-surface`, `gap-lg` — values from `@theme` in `app/globals.css`. Arbitrary values (`mt-[37px]`, `text-[#3a3a3a]`) are how a design system dies; if a needed value is missing, add it to `@theme` rather than inlining it.
- **Semantic wrapper.** `<section>` with an `aria-labelledby` pointing at its heading, so the section is navigable and named in the accessibility tree.

## Shape

```tsx
export function FeatureGrid() {
  return (
    <section aria-labelledby="features-heading" className="py-section">
      <div className="mx-auto max-w-content px-gutter">
        <h2 id="features-heading" className="text-h1">…</h2>
        …
      </div>
    </section>
  )
}
```

Keep the outer `<section>` responsible for vertical rhythm and the inner container responsible for horizontal bounds. Mixing the two is what produces sections that almost line up.

## Get these right the first time

They are cheap now and expensive to retrofit across a finished page.

- **375px first.** Build the mobile layout, then widen. Reversing this produces desktop designs that get crushed into a phone.
- **Images**: `next/image`, explicit dimensions, accurate `sizes`. `priority` only on the hero's LCP image.
- **Headings**: continue the page's outline. A section heading is almost always `<h2>`; do not pick a level for its size.
- **Focus states**: `focus-visible:` on every interactive element.
- **Motion**: wrap decorative animation in `motion-safe:`, or gate it on `prefers-reduced-motion`.
- **Empty and long states**: real copy is longer than placeholder copy, and Japanese wraps differently from English. Test with the actual text.

## Section-specific notes

**Hero** — carries LCP. Keep it server-rendered, one `priority` image, real copy in the first paint. Avoid a client-side typing animation on the headline; it delays the largest paint and hurts both LCP and the first impression.

**Pricing** — a table is a table. Use `<table>` with proper headers, not a grid of divs, so it is readable by screen reader and by anyone tabbing through.

**FAQ** — native `<details>`/`<summary>` is accessible and needs no JavaScript. If it is visible on the page, also emit `FAQPage` JSON-LD (see `/seo-meta`).

**Contact form** — labels on every field (not placeholders as labels), `autoComplete` attributes, inline validation announced via `aria-live`, and a Server Action for submission. Never log submitted personal data.

**Testimonials** — a static grid beats a carousel. Carousels hide content, cost JS, and are hard to make accessible; use one only if the user specifically wants it.

## After building

Run `/design-review` on the rendered result. Building and reviewing in one pass rarely catches anything — the second look with fresh criteria is where the fixes come from.
