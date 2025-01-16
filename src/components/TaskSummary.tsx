import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import TaskCard from "./TaskCard";
import { Task } from "../api/global.types";

const TaskSummary = () => {
  const [tasks, setTasks] = useState<Task[]|null>([]);
  const [loading,setLoading]=useState<boolean>(true)

  useEffect(()=>{
    setLoading(true)
    const getData= async ()=>{
      const {data}=await supaClient.from('tasks').select('*').eq('is_completed',false)
      setTasks(data)
      setLoading(false)
    }
    getData();
  
  },[])

  return (
    <div>
      {loading?<p>loading tasks</p>:
      tasks&&tasks.map((task) => {
        return <TaskCard key={task.task_id} task={task} />;
      })
      }
    </div>
  );
};

export default TaskSummary;
