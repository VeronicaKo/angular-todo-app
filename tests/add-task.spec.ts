import { test, expect } from '@playwright/test';

test('Add task', async ({ page }) => {
  const taskName = `new task ${Date.now()}`;

  await page.goto(`/`);
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('heading', { name: 'Todo List' })).toBeVisible();
  await page.locator('.task-input').fill(taskName);
  await expect(page.locator('.task-input')).toHaveValue(taskName);
  await page.locator('.add-button').click();
  await expect(page.getByText(taskName)).toBeVisible();
  await page.close();
});
