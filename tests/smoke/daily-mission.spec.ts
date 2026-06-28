import { expect, test } from "@playwright/test";

test("complete the first daily mission and keep reward after reload", async ({ page }) => {
  await page.goto("/#/");
  await page.getByRole("button", { name: /Mapa/i }).click();
  await page.getByRole("button", { name: /Jugar/i }).click();

  for (let i = 0; i < 20; i += 1) {
    if (await page.locator(".order-challenge").isVisible()) {
      const optionCount = await page.locator(".option-list--chips .option").count();
      for (let optionIndex = 0; optionIndex < optionCount; optionIndex += 1) {
        await page.locator(".option-list--chips .option").nth(optionIndex).click();
      }
    } else {
      await page.locator(".option").first().click();
    }

    await page.getByRole("button", { name: i === 19 ? "Ver recompensa" : "Siguiente reto" }).click();
  }

  await expect(page.getByRole("heading", { name: "Resultado" })).toBeVisible();
  await expect(page.getByText("primer color arcoiris")).toBeVisible();
  await expect(page.getByRole("button", { name: /Viajar a Torre de la Ortografía/i })).toBeVisible();
  await page.reload();
  await page.goto("/#/parents");
  await expect(page.locator(".metric-grid").getByText("misiones")).toBeVisible();
});

test("resume an unfinished mission from the next pending challenge", async ({ page }) => {
  await page.goto("/#/map");
  await page.getByRole("button", { name: /Jugar/i }).click();
  await page.locator(".option").first().click();
  await page.getByRole("button", { name: "Siguiente reto" }).click();

  await page.goto("/#/map");
  await page.getByRole("button", { name: /Jugar/i }).click();

  await expect(page.getByText("Reto 2/20")).toBeVisible();
  await expect(page.getByRole("heading", { name: "¿Dónde empieza Angela su aventura?" })).toBeVisible();
});
