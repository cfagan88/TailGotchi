import { useState } from "react";
import { supaClient } from "../api/client";
import { Task } from "../api/global.types";
import taskDog from "../assets/animations and images/happy-dog.gif";

const CompletedTaskCard = ({ completeTask }: { completeTask: Task }) => {
  const {
    pet_id,
    task_info,
    task_name,
    assigned_user,
    task_difficulty,
  } = completeTask;

  const [petName, setPetName] = useState<string>("");
  const [petGender, setPetGender] = useState<string | null>("");

  supaClient
    .from("pets")
    .select("pet_name, gender")
    .eq("pet_id", pet_id)
    .then(({ data }) => {
      if (data) {
        setPetName(data[0].pet_name);
        setPetGender(data[0].gender)
        return;
      }
    });
      
  return (
    <div className="p-4 text-navy rounded-xl my-4 bg-primarydark max-w-4xl mx-auto drop-shadow-lg">
      <div className="flex justify-between items-center">
<h2 className="text-2xl text-navy font-bold line-through">{task_name}</h2>
            <p
              className={`p-2 w-1/6 text-white text-center font-bold rounded-xl ${
                task_difficulty?.toLowerCase() === "easy"
                  ? "bg-green-400"
                  : task_difficulty?.toLowerCase() === "medium"
                  ? "bg-orange-400"
                  : task_difficulty?.toLowerCase() === "hard"
                  ? "bg-red-400"
                  : "bg-white"
              }`}
            >
              {task_difficulty}
            </p>
            </div>
      <h2 className="mb-2 text-xl text-navy">
        Due Date: Completed
      </h2>
      <div className="flex">
        <h3 className="mb-2 text-xl text-navy">{petName}</h3>
        <img
              src={taskDog}
              alt={petName || "Pet"}
              className={
                `ml-2 w-6 h-6 object-cover rounded-full border-2 border-navy border-opacity-45 mb-4 mx-auto ${
                  petGender?.toLowerCase() === "female"
                    ? "bg-pink"
                    : petGender?.toLowerCase() === "male"
                    ? "bg-navy"
                    : "bg-gray-200"
                }`
              }
            />
      </div>
      <h3 className="mb-2 text-xl text-navy">Assigned to: {assigned_user}</h3>
      <p className="mb-4 text-base font-light content-center h-20 pl-2 rounded-xl bg-white bg-opacity-70">
        {task_info}
      </p>
      <div className="flex justify-end">
      </div>
    </div>
  );
};

export default CompletedTaskCard;
