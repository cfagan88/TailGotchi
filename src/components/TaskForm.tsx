import React, { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import { Pet } from "../api/global.types";

interface ComponentProps {
  setShowForm: Function;
}

const TaskForm:React.FC<ComponentProps>= ({ setShowForm }) => {
  const [myPets, setMyPets] = useState<Pet[] | null>();
  const [taskName, setTaskName] = useState<string>("");
  const [taskInfo, setTaskInfo] = useState<string>("");
  const [selectedPet, setSelectedPet] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supaClient.auth.getUser();
      if (user) {
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

  const handleAddTask = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowForm(false);

    

    try { 
      const {data}=await supaClient
    .from('tasks')
    .insert([{
      task_name:taskName,
      task_info:taskInfo,
      pet_id: selectedPet,
      CreationDate:Date.now(),
      CompletionDate:null,
      is_completed:false,
    }])
    .select()
    if(data){
      setSelectedPet(""),
      setTaskName(""),
      setTaskInfo("")
    }
  }
    catch(error){
      console.log("error")
    }
  };
  return (
    <form className="p-8 text-navy rounded-xl my-4 bg-primarylight max-w-4xl mx-auto">
      <h2>Add a task</h2>
      <input
        type="text"
        placeholder="Task Name"
        required
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="mb-4 bg-white"
      />
      <input
        type="text"
        placeholder="Task Description"
        required
        value={taskInfo}
        onChange={(e) => setTaskInfo(e.target.value)}
        className="mb-4 bg-white"
      />
      <label>Assign Pet</label>
      <select required className="mb-4 bg-white" onChange={(e)=>{setSelectedPet(e.target.value)}}>
        <option selected hidden disabled>
          Please Select a Pet
        </option>
        {myPets?.map((pet) => {
          return (
            <option key={pet.pet_name} value={pet.pet_id}>
              {pet.pet_name}
            </option>
          );
        })}
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </form>
  );
};

export default TaskForm;
