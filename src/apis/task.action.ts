import getTodoApi from "../lib/HttpClient/index";
import { Task } from "../../shared/types/task/task";
import { TeamsUserCredential } from "@microsoft/teamsfx";
import { CreateTaskRequest } from "../../shared/types/task/request/createTaskRequest";

export default function createTaskAction(cred: TeamsUserCredential) {
  const todoApi = getTodoApi(cred);

  return {
    async getAllTasksByUserId() {
      const result = await todoApi.get<Task[]>(`/tasks`);
      return result.data;
    },
    async createTask(data: CreateTaskRequest) {
      const result = await todoApi.post<Task>(
        "/tasks",
        data
      );
      return result.data;
    },
    async updateTaskById( data: Task) {
      const result = await todoApi.put<Task>(
        `/tasks`,
        { data }
      );
      return result.data;
    },
    async deleteTaskById(taskId: string) {
      const result = await todoApi.delete(
        `/tasks/${taskId}`
      );
      return result.data.message;
    },
  };
}
