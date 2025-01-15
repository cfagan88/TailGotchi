import { useState } from "react";
import { supaClient } from "../api/client";
import TaskCard from "./TaskCard";
import { Task } from "../api/global.types";

const TaskSummary = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  //might need to put the below into a useEffect
  supaClient
    .from("tasks")
    .select("*")
    .then(({ data, error }) => {
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setTasks(data);
      }
    });

  return (
    <div>
      {tasks.map((task) => {
        return <TaskCard task={task} />;
      })}
    </div>
  );
};

export default TaskSummary;
