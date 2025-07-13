import { APIRequestContext, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export class ApiService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async addTask(taskName: string): Promise<number> {
    const response = await this.request.post(BASE_URL, {
      data: {
        title: taskName,
        completed: false,
        userId: 1,
      },
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    return responseBody.id;
  }

  async getTaskIdByName(taskName: string): Promise<number | null> {
    console.log(`[API] Поиск задачи: ${taskName}`);
    const response = await this.request.get(BASE_URL, {
      params: { title: taskName },
    });

    expect(response.ok()).toBeTruthy();

    const tasks = await response.json();
    return tasks.length > 0 ? tasks[0].id : null;
  }

  async taskExists(taskName: string): Promise<boolean> {
    const taskId = await this.getTaskIdByName(taskName);
    return taskId !== null;
  }

  async deleteTask(taskName: string): Promise<void> {
    const taskId = await this.getTaskIdByName(taskName);
    const response = await this.request.delete(`${BASE_URL}/${taskId}`);

    expect(response.ok()).toBeTruthy();
  }

  async editTask(taskName: string): Promise<void> {
    const taskId = await this.getTaskIdByName(taskName);
    const response = await this.request.put(`${BASE_URL}/${taskId}`, {
      data: {
        userId: 1,
        id: taskId,
        title: taskName,
        completed: false,
      },
    });

    expect(response.ok()).toBeTruthy();
  }

  async markTaskAsCompleted(
    taskName: string,
    completed: boolean
  ): Promise<void> {
    const taskId = await this.getTaskIdByName(taskName);
    const response = await this.request.put(`${BASE_URL}/${taskId}`, {
      data: {
        userId: 1,
        id: taskId,
        title: taskName,
        completed: completed,
      },
    });

    expect(response.ok()).toBeTruthy();
  }
}
