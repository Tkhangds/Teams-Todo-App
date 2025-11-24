import { tasks } from "../lib/cosmos";

export class TaskRepository {
  async getAll(userId: string) {
    try {
      const query = {
        query: "SELECT * FROM c WHERE c.userId = @uid",
        parameters: [{ name: "@uid", value: userId }]
      };
      const { resources } = await tasks.items.query(query).fetchAll();
      return resources;
    } catch (err) {
      console.error("task:getAll", err);
      throw err;
    }
  }

  async create(task: any) {
    try {
      const { resource } = await tasks.items.create(task);
      return resource;
    } catch (err) {
      console.error("task:create", err);
      throw err;
    }
  }

  async update(task: any) {
    try {
      const { resource } = await tasks.item(task.data.id, task.userId).replace(task.data);
      return resource;
    } catch (err) {
      console.error("task:update", err);
      throw err;
    }
  }

  async remove(id: string, userId: string) {
    try {
      await tasks.item(id, userId).delete();
    } catch (err) {
      console.error("task:remove", err);
      throw err;
    }
  }
}

export const taskRepository = new TaskRepository();
