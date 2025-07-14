import { expect, test } from './base-test';

test('TS00002 - Marking a task as completed', async ({ todoPage }) => {
  const taskName = 'quis ut nam facilis et officia qui';
  /*так как данные, получаемые с апи постоянны и не изменяются в не зависимости от тестов, то
  используются константы, а не генерируются новые таски */

  await expect(todoPage.getTaskCheckbox(taskName)).not.toBeChecked();

  await todoPage.markTask(taskName);

  await expect(todoPage.getTaskCheckbox(taskName)).toBeChecked();
  await expect(todoPage.getTaskTitle(taskName)).toHaveClass(/completed/);
});
