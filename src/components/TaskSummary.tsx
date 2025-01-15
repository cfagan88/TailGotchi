import { useState, useEffect } from "react"
import { supaClient } from "../api/client"
import TaskCard from "./TaskCard"

const TaskSummary= ()=>{
    const [tasks,setTasks]=useState<Object[]|null>()
        //might need to put the below into a useEffect
        supaClient.from('tasks').select('*').then((tasksData)=>{
            setTasks(tasksData.data)
        })
    
    return <div>
            {tasks?.map((task)=>{
            return <TaskCard task={task}/>})}
       
    </div>



}



export default TaskSummary