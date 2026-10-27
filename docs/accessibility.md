# Accessibility

Target: WCAG 2.2 Level AA. Automated tools cannot prove full conformance; the manual checks below are required before each launch or big change.

## Automated (run in CI)

- `npm test` (`tests/a11y/contrast.test.ts`): every palette token in `global.css` meets 4.5:1 on `bg` and `panel`; button text, focus ring and pill border contrast.
- `npm run test:a11y` (Playwright + axe-core, Chromium):
  - axe with `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` at 1280x800 and 320x640: zero violations.
  - No horizontal scroll at 1280, 640 (200% zoom equivalent) and 320 (reflow, 1.4.10).
  - WCAG 1.4.12 text-spacing override at 320px: no clipped text or page overflow.
  - Keyboard: skip link is the first stop and moves focus into `main`; every tab stop has a visible, unobscured focus indicator, is in the viewport, is at least 24x24 (non-inline), and LinkedIn links tab in document order.
- `npm test` (`tests/a11y/contrast.test.ts`, Vitest): every palette colour used for text meets 4.5:1 on the background and panel colours, read straight from `src/styles/global.css`.
- Alt text on images is covered by axe (`image-alt`). The tests are deliberately accessibility-only and do not check copy or page structure, so content edits never need test edits.

## Manual checklist (before each launch)

- [ ] Screen reader pass (VoiceOver + Safari): headings read in order, bracket decorations are not announced, links make sense out of context.
- [ ] 400% zoom: content reflows, nothing is clipped.
- [ ] Forced colours / high-contrast mode: text, focus and buttons remain visible.
- [ ] `prefers-reduced-motion`: no smooth scrolling or animation.
- [ ] Keyboard-only pass: tab order matches reading order, focus never hidden.

## Manual check log

2026-10-27 (Claude, in a headless browser): keyboard tab order and focus visibility covered by the automated Playwright spec; screenshots reviewed at 1280px and 360px (no horizontal scroll, LinkedIn button above the fold on mobile).
Not checked: VoiceOver pass, 400% zoom in a real browser, forced-colours mode, reduced-motion in a real browser. Sara to do these.
