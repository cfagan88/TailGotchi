import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import TaskCard from "./TaskCard";
import { Task } from "../api/global.types";
import Lottie from "lottie-react";
import Loading from "../assets/animations and images/Loading.json";
import CompletedTaskCard from "./CompletedTaskCard";

interface TaskSummaryProp {
  isHomepage: boolean;
}

const TaskSummary: React.FC<TaskSummaryProp> = ({ isHomepage }) => {
  const [tasks, setTasks] = useState<Task[] | null>([]);
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
        .neq("is_completed", true);
      data?.sort((a, b) => a.DueDate - b.DueDate);
      setTasks(data);
      setLoading(false);
    }
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
    <div id="tasks-main" className="w-full">
      {loading ? (
        <Lottie
          animationData={Loading}
          className="loading-animation w-16 h-16 mx-auto"
        />
      ) : (
        tasks && (
          <>
            <div
              className={`${
                isHomepage
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : ""
              }`}
            >
              {tasks.map((task) => (
                <div key={task.task_id} className="relative rounded-lg p-4">
                  <TaskCard task={task} />
                </div>
              ))}
            </div>

            {!isHomepage && completeTasks && (
              <div className="mt-8">
                <h1 className="text-3xl underline text-navy font-bold text-center mb-4">
                  Completed Tasks
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completeTasks.map((completeTask) => (
                    <div
                      key={completeTask.task_id}
                      className="relative rounded-lg  p-4"
                    >
                      <CompletedTaskCard completeTask={completeTask} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default TaskSummary;
