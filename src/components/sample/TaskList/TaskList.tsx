import { useMemo, useState } from "react";
import { Button, Input } from "@fluentui/react-components";
import { TaskCard } from "../TaskCard/TaskCard";
import { Task } from "../../../../shared/types/task/task";
import "./TaskList.css";

type TaskListProps = {
  themeString: string;
  data: Task[];
  handleCreateTask: (title: string) => void;
};

type FilterType = "all" | "pending" | "done";

export default function TaskList({
  themeString,
  data,
  handleCreateTask,
}: TaskListProps) {
  const themeClass = useMemo(() => {
    if (themeString === "dark") return "dark";
    if (themeString === "contrast") return "contrast";
    return "light";
  }, [themeString]);

  const [title, setTitle] = useState<string>("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredData = useMemo(() => {
    if (filter === "all") return data;
    return data?.filter((task) => task.status === filter);
  }, [data, filter]);

  const createTask = () => {
    if (title.trim() === "") {
      alert("Task title cannot be empty.");
      return;
    }
    try {
      handleCreateTask(title);
    } catch (error) {
      console.error("Error creating task:", error);
    }
    setTitle("");
  };

  return (
    <div className={`pageContainer ${themeClass}`}>
      <div className="create-task-container">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              createTask();
            }
          }}
          placeholder="Enter task title"
        />
        <Button  onClick={createTask}>Create Task</Button>
      </div>
      <div className="filter-container">
        <Button 
          appearance={filter === "all" ? "primary" : "secondary"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button 
          appearance={filter === "pending" ? "primary" : "secondary"}
          onClick={() => setFilter("pending")}
        >
          Pending
        </Button>
        <Button 
          appearance={filter === "done" ? "primary" : "secondary"}
          onClick={() => setFilter("done")}
        >
          Done
        </Button>
      </div>
      <div className="taskList">
        {filteredData?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
