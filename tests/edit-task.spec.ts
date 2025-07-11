import { expect, test } from './base-test';

test('TS00009 - Edit task', async ({ todoPage }) => {
  const taskToEdit = 'quis ut nam facilis et officia qui';
  const newTaskName = `new task name ${Date.now()}`;

  await expect(todoPage.getTask(taskToEdit)).toBeVisible();
  await todoPage.editTask(taskToEdit, newTaskName);
  await expect(todoPage.getTask(taskToEdit)).not.toBeVisible();
  await expect(todoPage.getTask(newTaskName)).toBeVisible();
});

test.skip('TS00010 - Edit task with empty title', {}, async ({ todoPage }) => {
  const taskToEdit = 'illo expedita consequatur quia in ';

  await expect(todoPage.getTask(taskToEdit)).toBeVisible();
  await todoPage.editTask(taskToEdit, '');
  // TODO реализовать после уточения требований
});
