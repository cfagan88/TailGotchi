import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import { Pet } from "../api/global.types";

const TaskForm = () => {
  const [myPets, setMyPets] = useState<Pet[] | null>();
  const [taskName, setTaskName] = useState<string>("");
  const [taskInfo, setTaskInfo] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supaClient.auth.getUser();
      if(user){
          const { data } = await supaClient
            .from("pets")
            .select("*,users_pets!inner(*)")
            .eq("users_pets.user_id", user.id);
          //   const {data}=await supaClient.from('pets').select('*,users_pets!inner(*))').eq('pets.users_pets.user_id',user.id)
          setMyPets(data);
      }
    };
    getData();
  }, []);

  const handleAddTask = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <form className="p-8 text-navy rounded-xl my-4 bg-primarylight max-w-4xl mx-auto">
      <h2>Add a task</h2>
      <input type="text" placeholder="Task Name" required value={taskName} onChange={(e)=>setTaskName(e.target.value)} className="mb-4 bg-white"/>
      <input type="text" placeholder="Task Description" required value={taskInfo} onChange={(e)=>setTaskInfo(e.target.value)} className="mb-4 bg-white"/>
      <label>Assign Pet</label>
      <select required className="mb-4 bg-white">
        {myPets?.map((pet) => {
          return <option key={pet.pet_name}>{pet.pet_name}</option>;
        })}
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </form>
  );
};

export default TaskForm;
