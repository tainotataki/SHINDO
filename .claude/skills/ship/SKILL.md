---
name: ship
description: Runs the pre-deploy checklist for this Vercel-hosted site — typecheck, lint, production build, design and accessibility review, Core Web Vitals, SEO metadata, security headers, and environment variables — then reports what is blocking release. Use whenever the user says deploy, ship, release, 公開, 本番, リリース, or asks whether the site is ready to go live. Run it before any production deployment.
disable-model-invocation: false
allowed-tools: Read, Grep, Glob, Bash, mcp__Claude_Browser__preview_start, mcp__Claude_Browser__navigate, mcp__Claude_Browser__computer
---

# Pre-deploy check

Vercel makes deploying easy enough that it happens before anyone checks. This is the gate.

Work through the phases in order and collect findings; do not stop at the first failure, because the user wants the full picture in one pass rather than a fix-run-fix loop.

## 1. It has to build

```bash
pnpm typecheck && pnpm lint && pnpm build
```

Read the build output rather than only the exit code. Two things matter beyond pass/fail:

- **Route rendering modes.** Next.js prints whether each route is static, ISR, or dynamic. A marketing page that turned dynamic — usually from `cookies()`, `headers()`, or an uncached `fetch` — loses its CDN cache and its LCP with it. If a static page became dynamic, that is a finding.
- **First Load JS.** Sudden growth means a dependency landed in a client bundle. Investigate before shipping it.

## 2. It has to be correct on screen

Run these and fold their findings in:

- `/design-review` — the pages that changed, at 375 / 768 / 1280
- `/a11y-check` — anything public-facing
- `/web-vitals` — against a production build (`next build && next start`), not dev
- `/seo-meta` — new or changed pages

Skipping these because "nothing visual changed" is how a config change ships a broken layout. Check what actually changed with `git diff --stat` and scope accordingly.

## 3. Environment and configuration

- Every variable used in code exists in Vercel for Production **and** Preview. A missing Preview variable produces a broken preview that gets dismissed as flaky.
- Nothing secret is prefixed `NEXT_PUBLIC_` — that prefix inlines the value into the client bundle, where it is public forever. Grep for it and check each hit.
- No secrets committed: `git diff --cached` before the commit, and confirm `.env*` is ignored.
- The production domain is set, one canonical host, the other redirecting.
- Preview deployments are `noindex` — verify the header rather than assuming.

## 4. Security headers

Confirm these are set in `next.config.ts` or `vercel.json`:

- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` — worth the effort on a corporate site; start in `Report-Only` and promote once clean
- `Permissions-Policy` denying camera, microphone, and geolocation unless used

Check the deployed response, not the config file:

```bash
curl -sI https://<preview-url> | grep -iE 'strict-transport|x-content-type|referrer-policy|content-security|permissions-policy'
```

Also confirm Next.js is on a patched version — `npm outdated next` and check the release notes. The App Router has had security releases; running behind on a public site is an avoidable risk.

## 5. The things that get forgotten

- 404 and error pages exist and match the design (`app/not-found.tsx`, `app/error.tsx`)
- `favicon.ico`, `apple-icon.png`, `manifest` present
- External links carry `rel="noopener noreferrer"`
- Analytics fires in production and not in development
- Forms actually deliver somewhere, and the success and failure states both render
- Legal pages required for a Japanese corporate site are present and linked: プライバシーポリシー, 特定商取引法に基づく表記 (if selling), 会社概要

## Report

```
## 🚫 ブロッカー
<これがある限りデプロイしない>

## ⚠️ 要確認
<デプロイは可能だが、判断が必要>

## ✅ 通過
<確認済みの項目。1 行ずつ>
```

State clearly what you verified by running or fetching, versus what you inferred from reading source. The distinction matters: a config file that sets a header is not proof the header is served.

Do not deploy. Report, let the user decide, and give them the command.
