import { Locator, Page, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly taskInput: Locator;
  readonly addButton: Locator;
  readonly taskList: Locator;
  readonly taskItem: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;
  readonly filterAll: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', { name: 'Todo List' });
    this.taskInput = page.locator('.task-input');
    this.addButton = page.locator('.add-button');
    this.taskList = page.locator('.task-list');
    this.taskItem = page.locator('.task-item');
    this.filterActive = page.getByRole('button', { name: 'Active' });
    this.filterCompleted = page.getByRole('button', { name: 'Completed' });
    this.filterAll = page.getByRole('button', { name: 'All' });
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    await this.heading.waitFor();
  }

  async addTask(taskName: string) {
    await this.taskInput.fill(taskName);
    await this.addButton.click();
    return this.getTask(taskName);
  }

  getTask(taskName: string) {
    return this.page.locator(
      `.task-content:has(.task-title:has-text("${taskName}"))`
    );
  }

  async markTaskAsCompleted(taskName: string) {
    const task = this.getTask(taskName);
    const checkbox = task.locator('.task-checkbox');
    await checkbox.check();
    return task;
  }

  async removeTask(taskName: string) {
    const task = this.getTask(taskName);
    await task.locator('.delete-button').click();
    return task;
  }

  async filterTasks(filter: 'Active' | 'Completed' | 'All') {
    switch (filter) {
      case 'Active':
        await this.filterActive.click();
        break;
      case 'Completed':
        await this.filterCompleted.click();
        break;
      default:
        await this.filterAll.click();
    }
    await this.page.waitForLoadState('networkidle');
  }
}
