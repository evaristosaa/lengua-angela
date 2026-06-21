import { expect, test } from "@playwright/test";

test("complete the first daily mission and keep reward after reload", async ({ page }) => {
  await page.goto("/#/");
  await page.getByRole("button", { name: /Mapa/i }).click();
  await page.getByRole("button", { name: /Jugar/i }).click();

  for (let i = 0; i < 12; i += 1) {
    await page.locator(".option").first().click();
    await page.getByRole("button", { name: i === 11 ? "Ver recompensa" : "Siguiente reto" }).click();
  }

  await expect(page.getByRole("heading", { name: "Resultado" })).toBeVisible();
  await expect(page.getByText("primer color arcoiris")).toBeVisible();
  await page.reload();
  await page.goto("/#/parents");
  await expect(page.locator(".metric-grid").getByText("misiones")).toBeVisible();
});
