import { test, expect } from '@playwright/test';

test('Remove task', async ({ page }) => {
  const taskToDelete = 'delectus aut autem';

  await page.goto(`/`);
  await page.waitForLoadState('networkidle');
  await expect(page.getByText(taskToDelete)).toBeVisible();
  await page
    .getByText('delectus aut autem Edit Delete')
    .locator('.delete-button')
    .click();
  await expect(page.getByText(taskToDelete)).toBeVisible({
    visible: false,
  });
  await page.close();
});
