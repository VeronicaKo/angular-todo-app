import { test, expect } from '@playwright/test';

test('Task filter', async ({ page }) => {
  const activeTask = 'quis ut nam facilis et officia qui';
  const completedTask = 'illo est ratione doloremque quia maiores aut';

  await page.goto(`/`);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Active' }).click();
  await expect(page.getByText(activeTask)).toBeVisible();
  await page.getByRole('button', { name: 'Completed' }).click();
  await expect(page.getByText(completedTask)).toBeVisible();
  await page.getByRole('button', { name: 'All' }).click();
  await expect(page.getByText(activeTask)).toBeVisible();
  await expect(page.getByText(completedTask)).toBeVisible();
  await page.close();
});
