import { expect, test } from './base-test';

test('TS00005 - Task list visibility', async ({ todoPage }) => {
  await expect(todoPage.heading).toBeVisible();
  await expect(todoPage.taskList).toBeVisible();
});
