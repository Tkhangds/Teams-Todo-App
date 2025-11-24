import { useContext } from "react";
import { TeamsFxContext } from "./Context";
import { CreateTaskRequest } from "../../shared/types/task/request/createTaskRequest";
import { useCreateTask, useGetAllTasksByUserId } from "../hook/apis/useTask";
import TaskList from "./sample/TaskList/TaskList";

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);

  const { mutateAsync: createTask } = useCreateTask();
  const { data } = useGetAllTasksByUserId();

  const handleCreateTask = async (title: string) => {
    const newTask: CreateTaskRequest = {
      title: title,
    };
    try {
      const createdTask = await createTask(newTask);
      console.log("Task created:", createdTask);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div>
      {data && (
        <TaskList
          themeString={themeString}
          data={data}
          handleCreateTask={handleCreateTask}
        />
      )}
    </div>
  );
}
