import { useState } from "react";
import { supaClient } from "../api/client";
import { Task } from "../api/global.types";
import taskDog from "../assets/animations and images/happy-dog.gif";

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
    console.log("clicked", task_id);
    await supaClient
      .from("tasks")
      .update({ is_completed: true, CompletionDate: Date.now() })
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
    <div className="p-4 text-navy rounded-xl my-4 bg-primarylight max-w-4xl mx-auto">
      <h2 className="text-2xl text-navy font-bold">{task_name}</h2>
      <div className="flex">
        <h3 className="mb-2 text-xl text-navy">{petName}</h3>
        <img
          className="ml-2 w-6 h-6 bg-mediumblue rounded-full"
          src={taskDog}
          alt=""
        />
      </div>
      <p className="mb-4 text-base font-light">{task_info}</p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleClick}
          className="bg-lightblue px-20 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue "
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
