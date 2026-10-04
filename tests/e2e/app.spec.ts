import { test, expect } from "@playwright/test";
import { factions } from "../../app/root-data";

const topicCounts: Record<string, number> = {
  "marquise-de-cat": 12, "eyrie-dynasties": 13, "woodland-alliance": 15,
  "vagabond": 20, "riverfolk-company": 16, "lizard-cult": 13,
  "underground-duchy": 15, "corvid-conspiracy": 10, "lord-of-the-hundreds": 15,
  "keepers-in-iron": 16, "lilypad-diaspora": 16, "twilight-council": 16,
  "knaves-of-the-deepwood": 15,
};

test("homepage, assets, health and every faction guide hydrate", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error" && /hydrat|didn't match|Minified React error/i.test(message.text())) errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Tập hợp mọi người/ })).toBeVisible();
  expect(await (await request.get("/api/health")).json()).toEqual({ status: "ok" });
  for (const asset of ["/fonts/be-vietnam-pro-400.ttf", "/assets/autumn-map.webp", "/favicon.svg"]) {
    expect((await request.get(asset)).ok()).toBeTruthy();
  }
  await page.goto("/rules");
  await expect(page.locator(".rule-toc a").first()).toBeVisible();
  await expect(page.locator("#full-rules")).toBeVisible();
  for (const faction of factions) {
    await page.goto(`/rules/factions/${faction.id}`);
    const sections = page.locator(".rule-section"), links = page.locator(".rule-toc a");
    await expect(links.first()).toBeVisible();
    const count = await sections.count();
    expect(count).toBe(topicCounts[faction.id]);
    await expect(links).toHaveCount(count);
    for (let i = 0; i < count; i++) {
      await expect(sections.nth(i)).toBeVisible();
      await expect(sections.nth(i).locator(".rule-point p").first()).not.toBeEmpty();
    }
    await expect(page.locator(".scene-selector, .story-navigation, .story-playback, .step-dots")).toHaveCount(0);
    const target = await links.nth(1).getAttribute("href");
    await links.nth(1).click();
    await expect(page).toHaveURL(new RegExp(`${target}$`));
    await expect(sections.first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("single-page rule guides fit a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/rules", ...factions.map(faction => `/rules/factions/${faction.id}`)]) {
    await page.goto(path);
    await expect(page.locator(".rule-section").last()).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, path).toBeLessThanOrEqual(1);
  }
});

test("Cat and Eyrie examples keep independent state and action constraints", async ({ page }) => {
  await page.goto("/rules/factions/marquise-de-cat");
  const actions = page.locator("#cat-actions"), build = page.locator("#cat-build");
  await actions.getByRole("button", { name: "Recruit", exact: true }).click();
  await expect(actions.getByRole("button", { name: "Recruit", exact: true })).toBeDisabled();
  await build.getByRole("button", { name: "Đối thủ rule", exact: true }).click();
  await expect(build.getByRole("button", { name: "Trả gỗ và xây tại C" })).toBeDisabled();
  await build.getByRole("button", { name: "Mèo rule", exact: true }).click();
  await build.getByRole("button", { name: "Trả gỗ và xây tại C" }).click();
  await expect(build.locator(".score-gain")).toContainText("Xây xong");
  await build.getByRole("button", { name: "Đặt lại ví dụ", exact: true }).click();
  await expect(build.getByRole("button", { name: "Trả gỗ và xây tại C" })).toBeEnabled();
  await expect(actions.getByRole("button", { name: "Recruit", exact: true })).toBeDisabled();

  await page.goto("/rules/factions/eyrie-dynasties");
  const decree = page.locator("#eyrie-dynasties-decree"), rule = page.locator("#eyrie-dynasties-rule");
  await expect(decree.locator(".decree-resolve b")).toHaveText("Đang đọc: Recruit");
  await decree.getByRole("button", { name: "Đã làm hết cột · sang cột kế" }).click();
  await expect(decree.locator(".decree-resolve b")).toHaveText("Đang đọc: Move");
  await rule.getByRole("button", { name: "Thêm quân Mèo" }).click();
  await expect(rule.locator(".eyrie-result")).toContainText("Đại bàng không rule");
  await decree.getByRole("button", { name: "Đặt lại ví dụ", exact: true }).click();
  await expect(decree.locator(".decree-resolve b")).toHaveText("Đang đọc: Recruit");
  await expect(rule.locator(".eyrie-result")).toContainText("Đại bàng không rule");
});

test("host and guest share faction selection and clearing results", async ({ browser }) => {
  const hostContext = await browser.newContext();
  const guestContext = await browser.newContext();
  const host = await hostContext.newPage(), guest = await guestContext.newPage();
  const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
  try {
    await host.goto(base);
    await host.getByLabel("Tên của bạn").fill("Chủ phòng thử");
    await host.getByRole("button", { name: "Tạo phòng mới" }).click();
    await expect(host.locator(".big-code")).toHaveText(/^[A-Z0-9]{6}$/);
    await guest.goto(host.url());
    await guest.getByLabel("Tên của bạn").fill("Bạn thử");
    await guest.getByRole("button", { name: "Tham gia phòng", exact: true }).click();
    await expect(host.locator(".members")).toContainText("2/6 người");
    for (const faction of factions.filter(f => !["marquise-de-cat", "eyrie-dynasties"].includes(f.id))) {
      await host.locator(".factions button").filter({ hasText: faction.vi }).click();
    }
    const eyrie = host.locator(".factions button").filter({ hasText: "Triều đại Đại bàng" });
    await eyrie.click();
    await host.getByRole("button", { name: "Random faction", exact: true }).click();
    await expect(host.locator(".error")).toContainText("Cần bật ít nhất 2 phe");
    await eyrie.click();
    await host.getByRole("button", { name: "Random faction", exact: true }).click();
    await expect(host.getByRole("heading", { name: /Tổng Reach 17/ })).toBeVisible();
    await expect(guest.getByRole("heading", { name: /Tổng Reach 17/ })).toBeVisible();
    await expect(host.locator(".result-grid article")).toHaveCount(2);
    await host.getByRole("button", { name: "Random clearing", exact: true }).click();
    await expect(host.locator(".clearing-marker.unassigned")).toHaveCount(0);
    await expect(guest.locator(".clearing-marker.unassigned")).toHaveCount(0);
    await expect(host.locator(".clearing-marker.fox")).toHaveCount(4);
    await expect(host.locator(".clearing-marker.rabbit")).toHaveCount(4);
    await expect(host.locator(".clearing-marker.mouse")).toHaveCount(4);
    expect(await guest.getByRole("button", { name: "Random faction", exact: true }).count()).toBe(0);
    // Preserve both Marsh variants and human-plus-bot setup.
    await host.locator(".maps button").filter({ hasText: "Marsh" }).click();
    await host.getByRole("button", { name: "Chia lại faction", exact: true }).click();
    await expect(host.getByRole("button", { name: "Random clearing", exact: true })).toBeDisabled();
    for (let i = 0; i < 3; i++) await host.locator(".clearing-marker").nth(i).click();
    await host.getByRole("button", { name: "Random clearing", exact: true }).click();
    await expect(host.locator(".clearing-marker.flooded")).toHaveCount(3);
    await expect(guest.locator(".clearing-marker.flooded")).toHaveCount(3);
    await host.getByRole("button", { name: "Chọn tất cả", exact: true }).click();
    for (let i = 0; i < 3; i++) {
      await host.getByRole("button", { name: "Thêm bot", exact: true }).click();
      await expect(host.locator(".bot-control b")).toHaveText(`${i + 1} bot`);
    }
    await host.getByRole("button", { name: "Random faction", exact: true }).click();
    await host.getByRole("button", { name: "Random clearing", exact: true }).click();
    await expect(host.locator(".clearing-marker.landmark")).toHaveCount(3);
    await expect(guest.locator(".clearing-marker.landmark")).toHaveCount(3);
    await expect(host.locator(".clearing-marker.flooded")).toHaveCount(0);
    for (const suit of ["fox", "rabbit", "mouse"]) await expect(host.locator(`.clearing-marker.${suit}`)).toHaveCount(5);
  } finally { await hostContext.close(); await guestContext.close(); }
});

test("map teaching scene actions and reset work on a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/rules/factions/keepers-in-iron");
  const encamp = page.locator("#keepers-in-iron-encamp");
  await page.locator('.rule-toc a[href="#keepers-in-iron-encamp"]').click();
  await encamp.getByRole("button", { name: "Encamp tại A", exact: true }).click();
  await expect(encamp.locator(".keepers-result")).toContainText("replace 1 warrior");
  await encamp.getByRole("button", { name: "Đặt lại ví dụ này", exact: true }).click();
  await expect(encamp.getByRole("button", { name: "Encamp tại A", exact: true })).toBeEnabled();
  await expect(encamp.locator(".keepers-result")).toHaveCount(0);
  // Demos in other sections keep independent state.
  await expect(page.locator("#keepers-in-iron-move").locator(".keepers-result")).toHaveCount(0);
});
