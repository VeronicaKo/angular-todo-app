import { expect, test } from './base-test';

test('TS00002 - Marking a task as completed', async ({ todoPage }) => {
  const taskToEdit = 'quis ut nam facilis et officia qui';

  const task = todoPage.getTask(taskToEdit);
  const checkbox = task.locator('.task-checkbox');

  await expect(checkbox).not.toBeChecked();
  await checkbox.check();
  await expect(checkbox).toBeChecked();
  await expect(task.locator('.task-title')).toContainClass('completed');
});
