---
name: design-review
description: Reviews the visual quality of a rendered page or component — typography, spacing rhythm, color, hierarchy, motion, responsive behavior — against SHINDO's art direction, and returns concrete fixes with file:line references. Use this whenever the user asks if a page "looks right", wants a screen polished, tightened, or made less generic, after building or significantly changing any UI, and before shipping a page. Also use when the user says the design feels bland, cluttered, cheap, off, or "AI っぽい".
allowed-tools: Read, Grep, Glob, Edit, Bash, mcp__Claude_Browser__preview_start, mcp__Claude_Browser__navigate, mcp__Claude_Browser__resize_window, mcp__Claude_Browser__computer, mcp__Claude_Browser__read_page, mcp__Claude_Browser__javascript_tool
---

# Design review

Design problems are hard to see in source code and obvious on screen. So this skill renders the page, looks at it, and reports what to change — not what is theoretically nice.

Reviewing is a different job from generating. If the task is "build me a hero section", that is generation work; do that first, then come back here. This skill's value is the second pass, where you stop being the author and start being the critic.

## Step 0 — Load the art direction

Read [`.claude/design/art-direction.md`](../../design/art-direction.md) first. Every judgment below is relative to it.

If the sections you need are still unfilled, say so plainly and review only against the universal checks in this file. Do not silently invent a direction — an invented one will conflict with the next person's, and the site drifts. If the user is ready to decide, help them fill the file; that is more valuable than any single review.

## Step 1 — Get it on screen

Render before judging.

1. Start the dev server with `preview_start` (`.claude/launch.json` has the `dev` entry).
2. Navigate to the page under review.
3. Screenshot at all three breakpoints from the art-direction file — 375, 768, 1280 — with `resize_window` then `computer` `screenshot`.

375px is where LPs actually break, and it is the width most reviews skip. Check it first, not last.

Also check, in the same pass:
- `resize_window` with `colorScheme: dark` if the project supports dark mode
- the page mid-scroll, not just at the top — sticky headers and scroll animations only misbehave in motion

## Step 2 — Look for these

Work through the list against the screenshots. For each hit, note the file and line.

**Typographic hierarchy.** Can you tell the reading order at a glance, squinting? Levels need real separation — a 16px body next to an 18px heading reads as one undifferentiated block. Check that the sizes actually come from the scale in the art direction rather than one-off values.

**Vertical rhythm.** Spacing between sections should come from the spacing scale, and the same *kind* of boundary should get the same gap throughout. Arbitrary values (`mt-[37px]`) are the usual culprit; grep for `-\[` in the page's classes.

**Line length.** Japanese body text past ~40 characters per line gets hard to track. Look for `max-w-*` on prose containers; full-width paragraphs on desktop are a common miss.

**Alignment and optical edges.** Text, images, and buttons should share edges down the page. Watch for a container that is centered while its contents are left-aligned, and for icons that are mathematically centered but look low.

**Color discipline.** One accent, used for the thing you want clicked. If the accent appears on a badge, a link, a button, and a border, it has stopped meaning anything. Confirm contrast: body text 4.5:1, large headings 3:1.

**State coverage.** Hover, focus-visible, active, disabled, loading, and empty. Missing focus rings are both an accessibility failure and a visible sign of unfinished work.

**Motion.** Does it serve orientation, or is it decoration that delays reading? Any animation must be suppressed under `prefers-reduced-motion: reduce` — verify by re-rendering with that media query forced, not by reading the CSS.

**Responsive integrity.** At 375px: does anything overflow horizontally, do tap targets reach 44×44px, do multi-column grids collapse sanely, does the nav still work?

## Step 3 — Check for generic-AI tells

These are the patterns models converge on when nobody gave them a direction. They are not wrong in isolation; they are wrong *together*, because their combination is the visual signature of "nobody decided anything."

- Inter, Roboto, or the system stack used because it was the default rather than chosen
- Purple-to-blue gradient behind the hero
- Three equal cards in a row, each with an icon, a bold line, and two lines of grey text
- Uniform `rounded-lg` + `shadow-md` on every surface
- Centered hero: eyebrow, big heading, grey subheading, one filled button, one outline button
- Placeholder-grade copy — "Get Started", "Learn More", "Empower your team"
- Emoji standing in for real icons

Flag any of these you see, and pair each with a replacement that follows the art direction. "This is generic" is not useful feedback on its own.

## Step 4 — Report

Lead with the screenshots, then:

```
## 全体の印象
<2〜3 文。何が効いていて、何が足を引っ張っているか>

## 直すべき点
1. **<問題>** — `path/to/file.tsx:42`
   現状: <何がそうなっているか>
   なぜ: <読者にどう影響するか。「ガイドライン違反だから」ではなく>
   修正: <具体的な変更。可能なら差分>

## 検討の余地
<好みが分かれる指摘。断定しない>

## 良い点
<維持すべき判断。次に触る人が壊さないように>
```

Order by reader impact, not by how easy the fix is. A hero that fails at 375px outranks an 8px spacing inconsistency, always.

Apply the fixes if the user asks. Report first regardless — a list of edits without the reasoning teaches nobody, and the same problems come back next page.
