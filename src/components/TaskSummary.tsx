import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import TaskCard from "./TaskCard";
import { Task } from "../api/global.types";
import Lottie from "lottie-react";
import Loading from "../assets/animations and images/Loading.json";
import CompletedTaskCard from "./CompletedTaskCard";

const TaskSummary = () => {
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [completeTasks, setCompleteTasks] = useState<Task[] | null>([])
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
      data?.sort((a, b) => a.DueDate - b.DueDate);
      setTasks(data);
      setLoading(false);

    }
    if(user){
      const { data } = await supaClient
        .from("tasks")
        .select("*, pets!inner(*,users_pets!inner(*))")
        .eq("pets.users_pets.user_id", user.id)
        .neq("is_completed", false);
        data?.sort((a, b) => a.task_id - b.task_id);
        setCompleteTasks(data);
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
        <Lottie animationData={Loading} className="loading-animation size-24" />
      ) : (
        tasks &&
        <>
        {tasks.map((task) => {
          return <TaskCard key={task.task_id} task={task} />;
        })}
        
        
        </>
      )}
    </div>
  );
};

export default TaskSummary;
