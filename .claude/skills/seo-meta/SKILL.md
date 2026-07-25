---
name: seo-meta
description: Sets up and audits SEO for this Next.js site — the Metadata API, titles and descriptions, OGP and Twitter cards, JSON-LD structured data, canonical URLs, sitemap.xml, robots.txt, and hreflang. Use whenever the user mentions SEO, 検索, metadata, meta tags, OGP, OG image, share preview, Twitter card, structured data, schema.org, JSON-LD, sitemap, robots.txt, canonical, or asks why a link looks wrong when shared on Slack/LINE/X. Run it on any new public page before shipping.
allowed-tools: Read, Grep, Glob, Edit, Write, Bash
---

# SEO and metadata

For a corporate site, metadata is how the company appears in the two places most people encounter it first: search results and a pasted link in a chat. Both are decided by markup nobody sees on the page itself, which is exactly why they get skipped.

## Metadata API

Next.js App Router generates head tags from exported `metadata` objects. Set the base in the root layout so every page inherits it.

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://shindo.example.com'),
  title: { default: 'SHINDO', template: '%s | SHINDO' },
  description: '<120〜160 字。検索結果に出る唯一の自由文>',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'SHINDO',
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
}
```

`metadataBase` matters more than it looks: without it, OG image paths stay relative and every crawler that requires absolute URLs silently drops the image. Broken share previews almost always trace back to this.

Per page, export `metadata`, or `generateMetadata` when it depends on data. `title` and `description` should be written for that page — inheriting the site-wide description across every page is a wasted signal and looks careless in results.

## OG images

`app/opengraph-image.tsx` renders an image at build time with `ImageResponse`, so the preview never drifts from the content.

- 1200×630
- Text large enough to read in a chat thumbnail — roughly 60px minimum
- Do not rely on a custom font without loading it explicitly; the default has no Japanese glyphs and text renders as blank boxes
- `app/twitter-image.tsx` for a different crop, otherwise the OG image is reused

Verify by fetching the deployed URL and inspecting the rendered `og:image`, not by trusting the source.

## Structured data

JSON-LD tells search engines what the page *is*. For a corporate site, three types carry most of the weight:

- **Organization** — in the root layout: legal name, logo, URL, `sameAs` links to official social accounts, contact point
- **WebSite** — site name and, if there is site search, `potentialAction`
- **BreadcrumbList** — on any page below the top level

Add `FAQPage` only where a real FAQ is visible on the page. Marking up content that is not there is a guidelines violation, and the manual penalty costs more than the rich result was worth.

Emit it as a script tag in the component:

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
```

Validate at [validator.schema.org](https://validator.schema.org) and Google's Rich Results Test.

## Crawling

- `app/sitemap.ts` exporting a `MetadataRoute.Sitemap` — Next generates `/sitemap.xml`
- `app/robots.ts` exporting `MetadataRoute.Robots`, pointing at the sitemap
- Canonical URL on every page via `alternates.canonical`; pick one host (www or apex) and redirect the other
- Vercel preview deployments must not be indexed — confirm previews send `X-Robots-Tag: noindex`

If the site ships Japanese and English, set `alternates.languages` for hreflang and make each version reference the other plus `x-default`.

## Audit checklist

When reviewing an existing page, verify against the rendered HTML rather than the source — that is what crawlers see.

```bash
curl -s https://<url> | grep -iE '<title>|og:|twitter:|canonical|application/ld\+json'
```

- Unique `<title>` under ~60 characters (Japanese is roughly half that in visual width)
- `description` present, 120–160 characters, page-specific
- `og:title`, `og:description`, `og:image` (absolute URL), `og:url`, `og:type`, `og:locale`
- `twitter:card`
- One canonical, self-referencing
- Exactly one `<h1>`, matching the page's actual subject
- No accidental `noindex` on a page meant to be indexed
- Structured data validates with no errors

Report findings as file, what is missing or wrong, and the concrete replacement — not as a generic list of best practices.
