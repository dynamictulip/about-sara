import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const viewports = [
  { width: 1280, height: 800 },
  { width: 320, height: 640 },
];

for (const vp of viewports) {
  test.describe(`${vp.width}x${vp.height}`, () => {
    test.use({ viewport: vp });

    test("has no axe violations", async ({ page }) => {
      await page.goto("/");
      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      expect(results.violations).toEqual([]);
    });

    test("does not scroll horizontally", async ({ page }) => {
      await page.goto("/");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}

// 1.4.4 / 1.4.10: 200% zoom of a 1280px window is a 640px layout; 400% is 320px.
test("reflows at 200% zoom equivalent (640px) without horizontal scroll", async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 800 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

// WCAG 1.4.12 text spacing override
test("survives text-spacing overrides at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  await page.addStyleTag({
    content: `* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
      p { margin-bottom: 2em !important; }`,
  });
  const result = await page.evaluate(() => {
    const clipped: string[] = [];
    for (const el of document.querySelectorAll<HTMLElement>("main *, nav *, footer *")) {
      const style = getComputedStyle(el);
      if (style.display === "inline") continue;
      if (el.scrollWidth > el.clientWidth + 1) clipped.push(el.tagName + "." + el.className);
    }
    return { clipped, overflow: document.documentElement.scrollWidth - window.innerWidth };
  });
  expect(result.clipped).toEqual([]);
  expect(result.overflow).toBeLessThanOrEqual(0);
});
