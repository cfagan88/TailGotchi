import { useState } from "react";
import { supaClient } from "../api/client";
import { Task } from "../api/global.types";

const TaskCard = ({ task }: { task: Task }) => {
  const {
    // completed_at,
    // created_at,
    // is_completed,
    pet_id,
    task_id,
    task_info,
    task_name,
  } = task;

  const [petName, setPetName] = useState<string>("");

  //   need to see if we can find difference between current date and created_at date for task
  //   created_at will now be using Date.now().  can compare the differences between the two and change into how many days its been since creation
  //   const dateNow=Date.now()
  //   const myDate=new Date(dateNow) - this changes epoch time to date format
  //   console.log(myDate)

  //update task to complete if button is pressed
  const handleClick = async () => {
    console.log("clicked", task_id)
    await supaClient
      .from("tasks")
      .update({ is_completed: true, CompletionDate:Date.now() })
      .eq("task_id", task_id)
      .select();
  };

  supaClient
    .from("pets")
    .select("pet_name")
    .eq("pet_id", pet_id)
    .then(({ data }) => {
      if (data) {
        setPetName(data[0].pet_name);
        return;
      }
    });
  return (
    <div className="p-8 text-navy rounded-xl my-4 bg-primarylight max-w-4xl mx-auto">
      <h2 className=" text-navy">
        Pet Name goes here: {petName}
        
      </h2>
      <h3 className=" text-navy">
        Task name goes here: {task_name}
        
      </h3>
      <p className=" text-navy">
        More info about the tasks: {task_info}
        
      </p>
      <button
        type="button"
        onClick={handleClick}
        className=" text-navy mb-4"
      >
        Complete
      </button>
    </div>
  );
};

export default TaskCard;

