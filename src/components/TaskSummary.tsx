import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import TaskCard from "./TaskCard";
import { Task } from "../api/global.types";

const TaskSummary = () => {
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    const {
      data: { user },
    } = await supaClient.auth.getUser();
    if (user) {
      const { data } = await supaClient
        .from("tasks")
        .select("*, pets!inner(*,users_pets!inner(*))")
        .eq("pets.users_pets.user_id", user.id)
        .neq("is_completed", true);
      data?.sort((a, b) => a.task_id - b.task_id);
      setTasks(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getData();
    supaClient
      .channel("tasks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },
        (_payload) => {
          getData();
        }
      )
      .subscribe();
  }, []);

  return (
    <div id="tasks-main">
      {loading ? (
        <p>loading tasks</p>
      ) : (
        tasks &&
        tasks.map((task) => {
          return <TaskCard key={task.task_id} task={task} />;
        })
      )}
    </div>
  );
};

export default TaskSummary;
