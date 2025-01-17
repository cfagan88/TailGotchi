import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import TaskCard from "./TaskCard";
import { Task } from "../api/global.types";
import TaskForm from "./TaskForm";

const TaskSummary = () => {
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
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

  const popUpTaskForm = () => {
    setShowForm(true);
  };

  return (
    <div>
      {showForm ? (
        <TaskForm setShowForm={setShowForm} />
      ) : (
        <button
          className="bg-lightblue px-20 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue"
          onClick={popUpTaskForm}
        >
          Add New Task
        </button>
      )}
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
