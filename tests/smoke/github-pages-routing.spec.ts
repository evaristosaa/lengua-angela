import { expect, test } from "@playwright/test";

test("hash routes survive direct loading", async ({ page }) => {
  await page.goto("/#/parents");
  await expect(page.getByRole("heading", { name: "Ajustes" })).toBeVisible();

  await page.goto("/#/map");
  await expect(page.getByRole("heading", { name: "Reino Arcoiris" })).toBeVisible();

  await page.goto("/#/missions");
  await expect(page.getByRole("heading", { name: "Elige reto" })).toBeVisible();

  await page.goto("/#/unicorn");
  await expect(page.getByRole("heading", { name: "Arcoiris" })).toBeVisible();
});
