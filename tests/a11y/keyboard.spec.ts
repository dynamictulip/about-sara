import { test, expect } from "@playwright/test";

test("skip link is first stop and moves focus into main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const first = page.locator(":focus");
  await expect(first).toHaveAttribute("href", "#main");
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("every tab stop has a visible, unobscured focus indicator and a 24px target", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  const count = await page.locator("a[href], button, input, select, textarea, [tabindex]:not([tabindex='-1'])").count();
  expect(count).toBeGreaterThan(5);

  const linkedinOrder: number[] = [];
  const seen: number[] = [];
  for (let i = 0; i < count; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      el.scrollIntoView({ block: "center", behavior: "instant" });
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      const outlined = s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0;
      const shadow = s.boxShadow !== "none";
      const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return {
        outlined: outlined || shadow,
        inViewport: r.top >= 0 && r.left >= 0 && r.bottom <= innerHeight && r.right <= innerWidth,
        unobscured: top === el || el.contains(top),
        w: r.width,
        h: r.height,
        inline: s.display === "inline",
        href: el.getAttribute("href") ?? "",
        y: r.top + scrollY,
      };
    });
    expect(info.outlined, `focus indicator on ${info.href}`).toBe(true);
    expect(info.inViewport, `in viewport ${info.href}`).toBe(true);
    expect(info.unobscured, `unobscured ${info.href}`).toBe(true);
    if (!info.inline) {
      expect(info.w).toBeGreaterThanOrEqual(24);
      expect(info.h).toBeGreaterThanOrEqual(24);
    }
    if (info.href.includes("linkedin.com")) linkedinOrder.push(info.y);
    seen.push(info.y);
  }
  expect(linkedinOrder).toEqual([...linkedinOrder].sort((a, b) => a - b));
  expect(linkedinOrder.length).toBeGreaterThanOrEqual(2);
  // Tab order follows reading order (page position never moves backwards beyond a nav row).
  const sorted = [...seen].sort((a, b) => a - b);
  expect(seen.slice(2)).toEqual(sorted.slice(2));
});
