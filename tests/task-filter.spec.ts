import { expect, test } from './base-test';
import { FilterType } from './pages/todo-page';

test('TS00004 - Task filter', async ({ todoPage }) => {
  const activeTask = 'quis ut nam facilis et officia qui';
  const completedTask = 'illo est ratione doloremque quia maiores aut';

  await todoPage.filterTasks(FilterType.ACTIVE);
  await expect(todoPage.getTask(activeTask)).toBeVisible();
  await expect(todoPage.getTask(completedTask)).toBeHidden();

  await todoPage.filterTasks(FilterType.COMPLETED);
  await expect(todoPage.getTask(activeTask)).toBeHidden();
  await expect(todoPage.getTask(completedTask)).toBeVisible();

  await todoPage.filterTasks(FilterType.ALL);
  await expect(todoPage.getTask(activeTask)).toBeVisible();
  await expect(todoPage.getTask(completedTask)).toBeVisible();
});
