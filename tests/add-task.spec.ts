import { request } from '@playwright/test';
import { expect, test } from './base-test';

test('TS00001 - Add task', async ({ todoPage }) => {
  const taskName = `new task ${Date.now()}`;

  await expect(todoPage.heading).toBeVisible();
  const task = await todoPage.addTask(taskName);
  await expect(task).toBeVisible();
});

test('TS00006 - Add task with long title', async ({ todoPage }) => {
  const taskLongTitle =
    '888888888888888888888888888888888888888888888888888888888888888888';

  await expect(todoPage.heading).toBeVisible();
  const task = await todoPage.addTask(taskLongTitle);
  await expect(task).toHaveScreenshot('task-long-title.png');
});

test('TS00007 - Add task with empty title', async ({ todoPage, page }) => {
  await expect(todoPage.heading).toBeVisible();
  await test.step('Проверка отсутствия POST-запроса', async () => {
    await todoPage.checkPostRequestCount('', 0);
  });
});

test.skip(
  'TS00008 - Add task with the same title',
  {},
  async ({ todoPage }) => {
    // TODO реализовать после уточения требований
  }
);
