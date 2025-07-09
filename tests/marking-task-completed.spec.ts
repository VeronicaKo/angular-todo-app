import { test, expect } from '@playwright/test';

test('Marking a task as completed', async ({ page }) => {
  const taskToEdit = 'quis ut nam facilis et officia qui';
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const taskCheckbox = page
    .locator(`.task-content:has(.task-title:has-text('${taskToEdit}'))`)
    .locator('.task-checkbox');
  await expect(taskCheckbox).not.toBeChecked();
  await taskCheckbox.check();
  await expect(taskCheckbox).toBeChecked();
  await expect(page.getByText(taskToEdit)).toContainClass('completed');
  await page.getByText(taskToEdit).click();
});
