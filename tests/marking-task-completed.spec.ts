import { expect, test } from './base-test';

test('TS00002 - Marking a task as completed', async ({ todoPage }) => {
  const taskName = 'quis ut nam facilis et officia qui';

  await expect(todoPage.getTaskCheckbox(taskName)).not.toBeChecked();

  await todoPage.markTask(taskName);

  await expect(todoPage.getTaskCheckbox(taskName)).toBeChecked();
  await expect(todoPage.getTaskTitle(taskName)).toHaveClass(/completed/);
});
