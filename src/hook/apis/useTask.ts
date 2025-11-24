import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import createTaskAction from "../../apis/task.action";
import { useContext, useMemo } from "react";
import { TeamsFxContext } from "../../components/Context";
import { CreateTaskRequest } from "../../../shared/types/task/request/createTaskRequest";
import { Task } from "../../../shared/types/task/task";
const useTaskAction = () => {
  const { teamsUserCredential } = useContext(TeamsFxContext);

  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }

  return useMemo(
    () => createTaskAction(teamsUserCredential),
    [teamsUserCredential]
  );
};

export const useGetAllTasksByUserId = () => {
  const taskAction = useTaskAction();

  return useQuery({
    queryKey: ["task"],
    queryFn: () => taskAction.getAllTasksByUserId(),
    placeholderData: keepPreviousData,
  });
};

export const useCreateTask = () => {
  const taskAction = useTaskAction();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: CreateTaskRequest) => taskAction.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
};

export const useUpdateTaskById = () => {
  const taskAction = useTaskAction();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: Task }) => taskAction.updateTaskById(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
};

export const useDeleteTaskById = () => {
  const taskAction = useTaskAction();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskAction.deleteTaskById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
};
