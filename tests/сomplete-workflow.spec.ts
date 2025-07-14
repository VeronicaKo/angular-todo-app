import { expect, test } from './base-test';
import { FilterType } from './pages/todo-page';

test('TS00011 - Complete task workflow', async ({ todoPage }) => {
  const newTask = `new task ${Date.now()}`;
  const updatedTask = `Updated task ${Date.now()}`;

  await todoPage.addTask(newTask);

  await todoPage.editTask(newTask, updatedTask);

  await todoPage.markTask(updatedTask);

  await todoPage.filterTasks(FilterType.COMPLETED);

  await todoPage.removeTask(updatedTask);
});
