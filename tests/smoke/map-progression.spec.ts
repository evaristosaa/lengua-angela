import { expect, test } from "@playwright/test";

test("map shows worlds and locked explanations", async ({ page }) => {
  await page.goto("/#/map");

  await expect(page.getByRole("heading", { name: "Reino Arcoiris" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Portal de los Colores" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Torre de la Ortografía" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Castillo de la Gramática" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Valle de la Comprensión" })).toBeVisible();
  await expect(page.getByText("Completa el primer mundo.").first()).toBeVisible();
});
