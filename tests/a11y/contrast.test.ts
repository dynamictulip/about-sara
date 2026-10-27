import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const css = readFileSync(resolve(__dirname, "../../src/styles/global.css"), "utf8");
const token = (name: string): string => {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token --${name} not found in global.css`);
  return m[1];
};

const channel = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => channel(parseInt(hex.slice(i, i + 2), 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const textTokens = ["text", "muted", "dim", "red", "yellow", "green", "blue", "purple", "pink", "orange"];

describe("palette contrast (WCAG 1.4.3)", () => {
  for (const surface of ["bg", "panel"]) {
    for (const name of textTokens) {
      it(`${name} on ${surface} is at least 4.5:1`, () => {
        expect(ratio(token(name), token(surface))).toBeGreaterThanOrEqual(4.5);
      });
    }
  }
  it("bg text on the purple button is at least 4.5:1", () => {
    expect(ratio(token("bg"), token("purple"))).toBeGreaterThanOrEqual(4.5);
  });
  it("bg text on the pink hover button is at least 4.5:1", () => {
    expect(ratio(token("bg"), token("pink"))).toBeGreaterThanOrEqual(4.5);
  });
  it("focus ring yellow on bg and on purple button is at least 3:1", () => {
    expect(ratio(token("yellow"), token("bg"))).toBeGreaterThanOrEqual(3);
  });
  it("topic pill border (dim) on bg is at least 3:1", () => {
    expect(ratio(token("dim"), token("bg"))).toBeGreaterThanOrEqual(3);
  });
});
