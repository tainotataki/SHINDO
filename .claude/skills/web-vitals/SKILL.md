---
name: web-vitals
description: Diagnoses and fixes Core Web Vitals on this Next.js site — LCP, INP, CLS — plus bundle size, image and font delivery, and render-blocking work. Use whenever the user says a page is slow, heavy, janky, 重い, or 遅い, mentions Lighthouse, PageSpeed, Core Web Vitals, LCP, INP, CLS, bundle size, or hydration cost, and run it before shipping a landing page. Also use when adding hero images, web fonts, video, embeds, analytics, or third-party scripts, since those are what actually break the budget.
allowed-tools: Read, Grep, Glob, Edit, Bash, mcp__Claude_Browser__preview_start, mcp__Claude_Browser__navigate, mcp__Claude_Browser__javascript_tool, mcp__Claude_Browser__read_network_requests, mcp__Claude_Browser__read_console_messages
---

# Core Web Vitals

An LP has one job, and a visitor who leaves before the hero paints never gets to do it. Performance here is conversion work, and it also feeds Google's ranking signals.

## Budget

Pass at the **75th percentile** on mobile. All three must pass — two out of three is a fail.

| Metric | Good | What it measures |
|---|---|---|
| LCP | < 2.5s | When the largest element — usually the hero image or headline — paints |
| INP | < 200ms | Worst-case delay from interaction to visible response |
| CLS | < 0.1 | How much the layout jumps while loading |

INP is the one most sites fail. It is also the one that source review catches poorly, so measure it.

## Measure before changing anything

Guessing at performance wastes time on the wrong bottleneck. Get numbers first.

```bash
npx unlighthouse --site http://localhost:3000   # 全ページ横断
```

For a single page, `preview_start` then run this in the browser:

```js
new Promise(res => {
  const out = {};
  new PerformanceObserver(l => { const e = l.getEntries().at(-1); out.LCP = Math.round(e.startTime); out.LCPElement = e.element?.tagName + '.' + (e.element?.className || ''); })
    .observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver(l => { out.CLS = (out.CLS || 0) + l.getEntries().filter(e => !e.hadRecentInput).reduce((s, e) => s + e.value, 0); })
    .observe({ type: 'layout-shift', buffered: true });
  const nav = performance.getEntriesByType('navigation')[0];
  out.TTFB = Math.round(nav?.responseStart);
  setTimeout(() => res(JSON.stringify(out, null, 2)), 3000);
})
```

Note *which element* is the LCP element. Optimizing anything else is wasted effort.

Also check `read_network_requests` for the largest transfers, and build with `ANALYZE=true` if `@next/bundle-analyzer` is configured.

Measure a production build (`next build && next start`). Dev mode numbers are meaningless — no minification, no static optimization.

## Fixes, in order of typical payoff

### LCP

The hero image is the LCP element on most LPs.

- `next/image` with `priority` on that one image only. `priority` preloads; putting it on several images makes them compete and helps none.
- Give every image explicit `width`/`height`, or `fill` with a sized parent. This also prevents CLS.
- Serve AVIF/WebP (`formats: ['image/avif', 'image/webp']` in `next.config`) and set `sizes` accurately — a wrong `sizes` ships a 2000px image to a 375px screen.
- Keep the hero server-rendered. A hero inside a `'use client'` component with a loading state cannot paint until JS arrives.
- Fonts via `next/font` — it self-hosts and preloads, removing a connection to Google's CDN from the critical path. Set `display: 'swap'`.
- Japanese fonts are large. Subset them, or use `next/font/local` with a subset file. An unsubsetted Noto Sans JP is several megabytes.

### INP

INP is dominated by JavaScript on the main thread.

- Keep components server-side by default. Every `'use client'` boundary ships code the browser must parse and hydrate.
- Push `'use client'` down to the smallest leaf that needs interactivity, rather than marking a whole page.
- `next/dynamic` with `ssr: false` for anything below the fold and heavy — carousels, maps, video players, chat widgets.
- Third-party scripts through `next/script` with `strategy="lazyOnload"` (or `afterInteractive` when they must run sooner). Analytics and tag managers are frequently the single largest INP contributor.
- React Compiler is stable in Next.js 16 and removes most manual memoization. Enable it rather than hand-writing `useMemo` everywhere.
- Long tasks: find them with `PerformanceObserver` on `longtask`, then break them up or move them off the critical path.

### CLS

- Explicit dimensions on every image, video, iframe, and ad slot.
- Reserve space for anything that loads late — banners, cookie notices, dynamically sized text.
- `font-display: swap` shifts text when the webfont lands; reduce the jump by matching fallback metrics (`next/font` does this via `adjustFontFallback`).
- Never insert content above existing content after load.
- Animate `transform` and `opacity` only. Animating `height`, `top`, or `margin` triggers layout and shows up in CLS.

## Verify

Re-measure on a production build and report the before/after for each metric. A fix that is not reflected in the numbers is not a fix — say so rather than assuming it helped.

Then wire up field data: `useReportWebVitals` sending to Vercel Analytics. Lab numbers on a fast Mac are optimistic; the 75th percentile of real visitors on real phones is what counts.
