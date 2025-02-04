import React, { useState, useEffect } from "react";
import { supaClient } from "../api/client";
import { Task, Pet } from "../api/global.types";
import taskDog from "../assets/animations and images/happy-dog.gif";
import handlePointCalculation from "../utils/handlePointCalculation";
import convertMiliseconds from "../utils/convertMiliseconds";

const TaskCard = ({ task }: { task: Task }) => {
  const {
    pet_id,
    task_id,
    task_info,
    task_name,
    assigned_user,
    DueDate,
    task_difficulty,
  } = task;

  const [myPets, setMyPets] = useState<Pet[] | null>();
  const [petName, setPetName] = useState<string>("");
  const [petGender, setPetGender] = useState<string | null>("");
  const [editTask, setEditTask] = useState<boolean>(false);
  const [taskInfo, setTaskInfo] = useState<Task>(task);

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
        setMyPets(data);
      }
    };
    getData();
  }, []);

  const handleCompleteTask = async () => {
    handlePointCalculation(pet_id, assigned_user, DueDate, task_difficulty);
    await supaClient
      .from("tasks")
      .update({ is_completed: true, CompletionDate: Date.now() })
      .eq("task_id", task_id)
      .select();
  };

  const handleEditTask = async () => {
    setEditTask(true);
  };

  const handleDeleteTask = async () => {
    await supaClient.from("tasks").delete().eq("task_id", task_id);
    const checkOverdue =
      Number(convertMiliseconds(DueDate - Date.now(), "d")) < 0 === true;
    if (checkOverdue) {
      handlePointCalculation(pet_id, assigned_user, DueDate, task_difficulty);
    }
  };

  const handleUpdateDatabase = async (e: React.FormEvent) => {
    e.preventDefault();
    await supaClient
      .from("tasks")
      .update({
        pet_id: taskInfo.pet_id,
        task_name: taskInfo.task_name,
        task_info: taskInfo.task_info,
      })
      .eq("task_id", task_id)
      .select();
    setEditTask(false);
  };

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
    <>
      {editTask ? (
        <form onSubmit={handleUpdateDatabase}>
          <div className="p-4 text-navy rounded-xl my-4 bg-primarylight max-w-4xl mx-auto">
            <h2 className="text-2xl text-navy font-bold">Task Name</h2>
            <input
              required
              value={taskInfo.task_name}
              onChange={(e) => {
                setTaskInfo({ ...taskInfo, task_name: e.target.value });
              }}
              className="w-full p-2 mt-1 border rounded bg-white text-navy"
            />
            <h2 className="text-2xl text-navy font-bold">Task Information</h2>
            <input
              value={taskInfo.task_info || ""}
              onChange={(e) => {
                setTaskInfo({ ...taskInfo, task_info: e.target.value });
              }}
              className="w-full p-2 mt-1 border rounded bg-white text-navy"
            />
            <h2 className="text-2xl text-navy font-bold">Pet Name</h2>
            <select
              required
              className="w-full p-2 border rounded bg-white text-navy"
              value={taskInfo.pet_id}
              onChange={(e) => {
                setTaskInfo({ ...taskInfo, pet_id: Number(e.target.value) });
              }}
            >
              <option value="" hidden disabled>
                Please Select a Pet
              </option>
              {myPets?.map((pet) => (
                <option key={pet.pet_name} value={pet.pet_id}>
                  {pet.pet_name}
                </option>
              ))}
            </select>
            <button className="bg-lightblue px-8 py-2 mt-4 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue">
              Complete
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 text-navy rounded-xl my-4 bg-primarydark max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-navy font-bold">{task_name}</h2>
            <p
              className={`p-2 w-24 text-white text-center font-bold rounded-xl ${
                task_difficulty?.toLowerCase() === "easy"
                  ? "bg-green-400"
                  : task_difficulty?.toLowerCase() === "medium"
                  ? "bg-orange-400"
                  : task_difficulty?.toLowerCase() === "hard"
                  ? "bg-red-400"
                  : "bg-gray-300"
              }`}
            >
              {task_difficulty}
            </p>
          </div>
          <h2 className="mb-2 text-lg text-navy">
            Due Date: {new Date(DueDate).toDateString()}
          </h2>
          <div className="flex items-center mb-2">
            <h3 className="text-lg text-navy">{petName}</h3>
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
          <h3 className="mb-2 text-lg text-navy">
            Assigned to: {assigned_user}
          </h3>
          <p className="mb-4 text-base font-light h-20 p-2 rounded-xl bg-white bg-opacity-70">
            {task_info}
          </p>
          <div className="flex justify-between flex-wrap gap-2">
            <button
              type="button"
              onClick={handleEditTask}
              className="bg-lightblue px-6 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDeleteTask}
              className="bg-lightblue px-6 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={handleCompleteTask}
              className="bg-lightblue px-6 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
