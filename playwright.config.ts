import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/a11y",
  testMatch: "**/*.spec.ts",
  use: { baseURL: "http://localhost:4399" },
  webServer: {
    command: "npm run build && npm run preview -- --port 4399 --ignore-lock",
    url: "http://localhost:4399",
    reuseExistingServer: false, // own port and always a fresh production build; never reuse or disturb the dev server on 4321
    // Always test the site at "/" even when CI sets BASE_PATH for deployment.
    env: { ASTRO_TELEMETRY_DISABLED: "1", SITE_URL: "", BASE_PATH: "" },
    timeout: 120_000,
  },
});
