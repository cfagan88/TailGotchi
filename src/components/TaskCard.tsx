import React, { useState, useEffect } from "react";
import { supaClient } from "../api/client";
import { Task, Pet } from "../api/global.types";
import taskDog from "../assets/animations and images/happy-dog.gif";

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
  const [editTask, setEditTask] = useState<boolean>(false);
  const [taskInfo, setTaskInfo] = useState<Task>(task);

  //   need to see if we can find difference between current date and created_at date for task
  //   created_at will now be using Date.now().  can compare the differences between the two and change into how many days its been since creation
  //   const dateNow=Date.now()
  //   const myDate=new Date(dateNow) - this changes epoch time to date format
  //   console.log(myDate)

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
    const {data} = await supaClient
    .from("users_pets")
    .select("*, users_profiles!inner(*)")
    .eq("pet_id", pet_id)
    .eq("users_profiles.username",assigned_user)
    if(data){
      const points=data[0].task_points
      const user_pet_id=data[0].user_pet_id
      await supaClient
      .from('users_pets')
      .update({task_points:(points+10)})
      .eq('user_pet_id',user_pet_id)
    }
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
    .select("pet_name")
    .eq("pet_id", pet_id)
    .then(({ data }) => {
      if (data) {
        setPetName(data[0].pet_name);
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
              className={`w-full p-2 mt-1 border rounded navy bg-white text-navy`}
            />
            <h2 className="text-2xl text-navy font-bold">Task Information</h2>
            <input
              value={taskInfo.task_info ? taskInfo.task_info : ""}
              onChange={(e) => {
                setTaskInfo({ ...taskInfo, task_info: e.target.value });
              }}
              className={`w-full p-2 mt-1 border rounded navy bg-white text-navy`}
            />
            <h2 className="text-2xl text-navy font-bold">Pet Name</h2>
            <select
              required
              className={`w-full p-2  border  rounded bg-white text-navy`}
              value={taskInfo.pet_id}
              onChange={(e) => {
                setTaskInfo({ ...taskInfo, pet_id: Number(e.target.value) });
              }}
            >
              <option value={""} hidden disabled>
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
            <button className="bg-lightblue px-20 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue">
              Complete
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 text-navy rounded-xl my-4 bg-primarydark max-w-4xl mx-auto drop-shadow-lg">
          <h2 className="text-2xl text-navy font-bold">{task_name} - {task_difficulty}</h2>
          <h2 className="mb-2 text-xl text-navy">Due Date: {new Date(DueDate).toDateString()}</h2>
          <div className="flex">
            <h3 className="mb-2 text-xl text-navy">{petName}</h3>
            <img
              className="ml-2 w-6 h-6 bg-mediumblue rounded-full"
              src={taskDog}
              alt=""
            />
          </div>
          <h3 className="mb-2 text-xl text-navy">
            Assigned to: {assigned_user}
          </h3>
          <p className="mb-4 text-base font-light content-center h-20 pl-2 rounded-xl bg-white bg-opacity-70">
            {task_info}
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleEditTask}
              className="bg-lightblue px-20 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue "
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDeleteTask}
              className="bg-lightblue px-20 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue "
            >
              Delete
            </button>
            <button
              type="button"
              onClick={handleCompleteTask}
              className="bg-lightblue px-20 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue "
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
