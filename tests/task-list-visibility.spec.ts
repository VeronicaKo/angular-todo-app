import { test, expect } from '@playwright/test';

test('Task list visibility', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('heading', { name: 'Todo List' })).toBeVisible();
  const taskList = page.locator('.task-list');
  await expect(taskList).toBeVisible();
  await expect(taskList).toHaveScreenshot('task-list.png');
  await page.close();
});
