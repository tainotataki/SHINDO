---
name: a11y-check
description: Audits a page or component for WCAG 2.2 AA accessibility problems — keyboard operability, focus visibility, contrast, semantic landmarks, form labels, alt text, reduced motion — and fixes what it finds. Use whenever the user mentions accessibility, a11y, アクセシビリティ, screen readers, keyboard navigation, contrast, WCAG, or 障害者差別解消法 / JIS X 8341-3, and run it before shipping any public-facing page. Also use when adding forms, modals, dropdowns, carousels, or custom interactive controls, since those are where accessibility breaks.
allowed-tools: Read, Grep, Glob, Edit, Bash, mcp__Claude_Browser__preview_start, mcp__Claude_Browser__navigate, mcp__Claude_Browser__read_page, mcp__Claude_Browser__computer, mcp__Claude_Browser__javascript_tool, mcp__Claude_Browser__resize_window
---

# Accessibility check

A corporate site is a public commitment. Inaccessible pages exclude real visitors, and in Japan the 障害者差別解消法 makes 合理的配慮 an obligation for private businesses — so this is not only a quality concern.

Target: **WCAG 2.2 Level AA**.

## How to audit

Static reading finds missing `alt`; it does not find a focus trap. Do both.

### 1. Read the accessibility tree

`read_page` returns the rendered accessibility tree — the same structure assistive technology consumes. This is the highest-signal single check available, because it shows what the page *communicates*, not what it contains.

Look for: unlabeled controls, headings out of order, missing landmarks, `generic` nodes where a `button` or `nav` should be.

### 2. Walk the keyboard path

Tab through the whole page with `computer` `key: Tab`, screenshotting as you go.

- Every interactive element reachable, in an order that matches the visual layout
- A visible focus indicator at every stop — 3:1 against its background, never `outline: none` without a replacement
- No trap: you can always Tab out, and Escape closes overlays
- Modals move focus in on open and return it on close
- A skip link to main content, appearing on first Tab

### 3. Check the machine-verifiable rules

Run this in the page via `javascript_tool` for a fast structural sweep:

```js
JSON.stringify({
  imgNoAlt: [...document.querySelectorAll('img:not([alt])')].map(e => e.src),
  emptyLinks: [...document.querySelectorAll('a')].filter(a => !a.textContent.trim() && !a.getAttribute('aria-label')).map(a => a.href),
  inputsNoLabel: [...document.querySelectorAll('input,select,textarea')].filter(el =>
    !el.labels?.length && !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby') && el.type !== 'hidden'
  ).map(el => el.name || el.id || el.outerHTML.slice(0, 80)),
  headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => h.tagName + ' ' + h.textContent.trim().slice(0, 40)),
  landmarks: [...document.querySelectorAll('header,nav,main,footer,aside,[role]')].map(e => e.tagName.toLowerCase() + (e.getAttribute('role') ? `[${e.getAttribute('role')}]` : '')),
  langAttr: document.documentElement.lang,
  positiveTabindex: [...document.querySelectorAll('[tabindex]')].filter(e => +e.tabIndex > 0).length,
}, null, 2)
```

Expected: exactly one `<h1>`, no level skips, one `<main>`, `lang="ja"` on `<html>`, zero positive `tabindex`, all arrays empty.

### 4. Confirm the rest by inspection

- **Contrast** — body ≥ 4.5:1, large text (≥24px, or ≥18.66px bold) and UI boundaries ≥ 3:1. Placeholder text and light-grey captions are the usual failures.
- **Color alone** — errors, required fields, and status must carry text or an icon too.
- **Target size (2.5.8, new in 2.2)** — interactive targets ≥ 24×24 CSS px, with 44×44 the practical floor on touch.
- **Reduced motion** — verify under `prefers-reduced-motion: reduce` that decorative animation stops. Re-render; do not just read the CSS.
- **Zoom** — at 200% zoom and at 320px width, no horizontal scroll and no clipped content.
- **Language** — `lang="ja"`, with `lang="en"` on inline English passages so screen readers switch voice.

## Next.js and Tailwind specifics

These are the recurring causes in this stack:

- `next/image` requires `alt`. Decorative images take `alt=""` — omitting the prop entirely is the bug.
- Tailwind's `focus:` fires on mouse click too; use `focus-visible:` so keyboard users get the ring and mouse users do not get a stray outline.
- shadcn/ui builds on accessible primitives, but that guarantee dies the moment you replace a `<Button>` with a styled `<div onClick>`. Keep the semantic element.
- A `<div>` with `onClick` needs `role`, `tabIndex={0}`, and Enter/Space handling. Reach for `<button>` instead — it is less code and it is correct.
- Client-side route changes do not announce themselves. Manage focus and the document title on navigation.

## Report

```
## 重大 — 利用を妨げる
<キーボードで到達不能、フォーカストラップ、ラベルなしフォームなど>

## AA 未達
<WCAG 2.2 AA を満たさない項目。達成基準の番号を添える>

## 改善余地
<AA は満たすが、体験として弱い箇所>
```

Each item: the file and line, what fails and for whom, and the fix. Cite the success criterion number (e.g. 1.4.3 Contrast) so it can be verified independently rather than taken on trust.

Fix the 重大 items in the same pass unless the user says otherwise — they are usually a few lines each, and leaving them queued means they ship.
