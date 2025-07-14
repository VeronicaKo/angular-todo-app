import { Locator, Page, expect } from '@playwright/test';

export enum FilterType {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  ALL = 'All',
}

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

  readonly editButton: string;
  readonly deleteButton: string;
  readonly taskCheckbox: string;
  readonly editNameInput: Locator;
  readonly saveButton: Locator;

  readonly taskTitle: Locator;

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

    this.editButton = '.edit-button';
    this.deleteButton = '.delete-button';
    this.taskCheckbox = '.task-checkbox';
    this.editNameInput = page.locator('.edit-input');
    this.saveButton = page.locator('.save-button');

    this.taskTitle = page.locator('.task-title');
  }

  async waitForDelay() {
    //ожидание ответа API
    await this.page.waitForTimeout(2000);
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    await this.heading.waitFor();
  }

  async addTask(taskName: string) {
    await this.taskInput.fill(taskName);
    await this.addButton.click();
    await this.waitForDelay();
    return this.getTask(taskName);
  }

  getTask(taskName: string): Locator {
    return this.page.locator('.task-item', {
      has: this.page.getByText(taskName),
    });
  }

  getTaskCheckbox(taskName: string): Locator {
    return this.getTask(taskName).locator(this.taskCheckbox);
  }

  getTaskTitle(taskName: string): Locator {
    return this.getTask(taskName).locator('.task-title');
  }

  async markTask(taskName: string) {
    await this.getTaskCheckbox(taskName).check();
    await this.waitForDelay();
  }

  async removeTask(taskName: string) {
    const task = this.getTask(taskName);
    await task.locator(this.editButton).click();
    return task;
  }

  async editTask(taskName: string, newTaskName: string) {
    const task = this.getTask(taskName);
    await task.locator(this.editButton).click();
    await this.editNameInput.fill(newTaskName);
    this.waitForDelay();
    await this.saveButton.click();
    await this.waitForDelay();
    return this.getTask(newTaskName);
  }

  async filterTasks(filter: FilterType) {
    switch (filter) {
      case FilterType.ACTIVE:
        await this.filterActive.click();
        break;
      case FilterType.COMPLETED:
        await this.filterCompleted.click();
        break;
      default:
        await this.filterAll.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async checkPostRequestCount(taskName: string, requestCount: number) {
    let postRequestCount = 0;

    this.page.on('request', (request) => {
      if (request.method() === 'POST' && request.url().includes('/todos')) {
        postRequestCount++;
      }
    });

    await this.addTask(taskName);

    await this.page.waitForTimeout(500);

    expect(postRequestCount).toBe(requestCount);
  }
}
