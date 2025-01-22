import TaskSummary from "../components/TaskSummary";
import TaskForm from "../components/TaskForm";
import { Task } from "../api/global.types";
import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import Lottie from "lottie-react";
import Loading from "../assets/animations and images/Loading.json";
import CompletedTaskCard from "../components/CompletedTaskCard";

const MyTasks = () => {
  const [completeTasks, setCompleteTasks] = useState<Task[] | null>([]);
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
    <>
      <TaskForm />
      <TaskSummary />
      <h1 className="text-2xl text-navy font-bold">Completed Tasks:</h1>
      {loading ? (
        <Lottie animationData={Loading} className="loading-animation size-24" />
      ) : (
        completeTasks &&
        completeTasks.map((completeTask) => (
          <CompletedTaskCard
            key={completeTask.task_id}
            completeTask={completeTask}
          />
        ))
      )}
    </>
  );
};

export default MyTasks;
