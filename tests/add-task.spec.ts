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
