import { expect, test } from './base-test';

test('TS00003 - Remove task', async ({ todoPage }) => {
  const taskToDelete = 'delectus aut autem';

  await expect(todoPage.getTask(taskToDelete)).toBeVisible();
  await todoPage.removeTask(taskToDelete);
  await expect(todoPage.getTask(taskToDelete)).toBeHidden();
});
