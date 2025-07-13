import { test as base } from '@playwright/test';
import { TodoPage } from './pages/todo-page';
import { ApiService } from './services/api-service';

export const test = base.extend<{ todoPage: TodoPage; apiService: ApiService }>(
  {
    todoPage: async ({ page }, use) => {
      const todoPage = new TodoPage(page);
      await todoPage.goto();
      await use(todoPage);
    },

    apiService: async ({ request }, use) => {
      await use(new ApiService(request));
    },
  }
);

export { expect } from '@playwright/test';
