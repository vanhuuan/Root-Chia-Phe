import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  workers: 1,
  outputDir: process.env.TEST_OUTPUT_DIR || "test-results",
  use: { baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:3000", trace: "retain-on-failure" },
  reporter: "list",
});
