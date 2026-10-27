import { defineConfig } from "astro/config";

// SITE_URL and BASE_PATH are set in the deploy workflow (.github/workflows/deploy.yml) for the project site.
export default defineConfig({
  site: process.env.SITE_URL || "http://localhost:4321",
  base: process.env.BASE_PATH || "/",
});
