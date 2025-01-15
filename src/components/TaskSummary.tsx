import { useState } from "react";
import { supaClient } from "../api/client";
import TaskCard from "./TaskCard";

const TaskSummary = () => {
  const [tasks, setTasks] = useState<any[]>([]);
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
