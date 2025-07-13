import { expect, test } from './base-test';

test('TS00009 - Edit task', async ({ todoPage, apiService }) => {
  const taskToEdit = 'quis ut nam facilis et officia qui';
  const newTaskName = `new task name ${Date.now()}`;

  await expect(todoPage.getTask(taskToEdit)).toBeVisible();
  await todoPage.editTask(taskToEdit, newTaskName);
  await expect(todoPage.getTask(taskToEdit)).not.toBeVisible();
  await expect(todoPage.getTask(newTaskName)).toBeVisible();

  todoPage.waitForAPIDelay();
  const existsOld = await apiService.taskExists(taskToEdit);
  expect(existsOld).toBe(false);

  const existsNew = await apiService.taskExists(newTaskName);
  expect(existsNew).toBe(true);
});

test.skip('TS00010 - Edit task with empty title', {}, async ({ todoPage }) => {
  const taskToEdit = 'illo expedita consequatur quia in ';

  await expect(todoPage.getTask(taskToEdit)).toBeVisible();
  await todoPage.editTask(taskToEdit, '');
  // TODO реализовать после уточения требований
  // await expect(todoPage.getTask(taskToEdit)).toBeVisible();
});
