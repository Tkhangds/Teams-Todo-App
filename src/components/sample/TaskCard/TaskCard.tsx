import * as React from "react";
import {
  Card,
  CardHeader,
  CardPreview,
  Button,
} from "@fluentui/react-components";
import {
  CheckmarkCircle20Regular,
  DismissCircle20Regular,
} from "@fluentui/react-icons";
import { Task } from "../../../../shared/types/task/task";
import {
  useUpdateTaskById,
  useDeleteTaskById,
} from "../../../hook/apis/useTask";
import "./TaskCard.css";

type TaskCardProps = {
  task: Task;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { mutateAsync: updateTask } = useUpdateTaskById();
  const { mutateAsync: deleteTask } = useDeleteTaskById();

  const handleToggle = async () => {
    try {
      const updatedTaskRequest: Task = {
        status: task.status === "done" ? "pending" : "done",
        title: task.title,
        userId: task.userId,
        id: task.id,
      };

      console.log("Updating status to:", updatedTaskRequest);

      await updateTask({ data: updatedTaskRequest });

      console.log("Status updated");
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const handleRemove = async () => {
    try {
      await deleteTask(task.id);
      console.log("Task removed");
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  return (
   <Card appearance="outline" className="task-card">
      <CardHeader
        header={<span className="task-card-title">{task.title}</span>}
        description={
          <span className="task-card-desc">{task.status}</span>
        }
      />

      <CardPreview className="task-card-actions">
        <Button
          appearance="primary"
          onClick={handleToggle}
          className="task-button"
        >
          {task.status === "done" ? "Mark Undone" : "Mark Done"}
        </Button>

        <Button
          appearance="secondary"
          onClick={handleRemove}
          className="task-button"
        >
          Remove
        </Button>
      </CardPreview>
    </Card>
  );
};
