import React, { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import { Pet, UserProfile } from "../api/global.types";
// import { GiOldWagon } from "react-icons/gi";

interface ComponentProps {
  setShowForm: Function;
}

const TaskForm: React.FC<ComponentProps> = ({ setShowForm }) => {
  const [myPets, setMyPets] = useState<Pet[] | null>();
  const [taskName, setTaskName] = useState<string>("");
  const [taskInfo, setTaskInfo] = useState<string>("");
  const [selectedPet, setSelectedPet] = useState<string>("");
  const [selectUserDropdown, setSelectUserDropdown] = useState<string>("");
  const [petOwners,setPetOwners]=useState<UserProfile[]|null>()

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
      const userData = await supaClient.from("users_profiles").select('*,users_pets!inner(*)')
      .eq('users_pets.pet_id', Number(selectedPet));
      setPetOwners(userData.data)
    };
    getData();
  }, [selectedPet]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !selectedPet) {
      console.log("error", taskName, selectedPet);
    } else {
      try {
        const { data } = await supaClient
          .from("tasks")
          .insert([
            {
              task_name: taskName,
              task_info: taskInfo,
              pet_id: Number(selectedPet),
              CreationDate: Date.now(),
              CompletionDate: null,
              is_completed: false,
              assigned_user:selectUserDropdown
            },
          ])
          .select();
        if (data) {
          setSelectedPet(""), setTaskName(""), setTaskInfo("");
          alert("Task added successfully!");
        }
      } catch (error) {
        console.log("error");
      }
      setShowForm(false);
    }
  };
  return (
    <form
      className="p-8 text-navy rounded-xl my-4 bg-primarylight max-w-4xl mx-auto"
      onSubmit={handleAddTask}
    >
      <div className="flex space-x-4">
        <div className="flex-1">
          <h2 className="text-h2 font-jersey25">Create task</h2>
          <input
            type="text"
            placeholder="Task Name"
            required
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className={`w-full p-2 mt-1 border ${
              taskName ? "border-mediumblue" : "border-red-500"
            } rounded bg-white text-navy`}
          />
          <input
            type="text"
            placeholder="Task Description"
            value={taskInfo}
            onChange={(e) => setTaskInfo(e.target.value)}
            className={`w-full p-2 mt-1 border rounded navy bg-white text-navy`}
          />
          <label htmlFor="pet_id" className="text-h2 font-jersey25">
            Assign pet{" "}
          </label>
          <select
            required
            className={`w-full p-2  border ${
              selectedPet ? "border-mediumblue" : "border-red-500"
            } rounded bg-white text-navy`}
            onChange={(e) => {
              setSelectedPet(e.target.value);
              setSelectUserDropdown("")
            }}
            value={selectedPet}
            id="pet_id"
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
          <br />
          <label className="text-h2 font-jersey25">Assign task to</label>
          <div className="flex">
            <select
              required
              className={`w-full p-2  border ${
                selectUserDropdown ? "border-mediumblue" : "border-red-500"
              } rounded bg-white text-navy`}
              onChange={(e) => {
                setSelectUserDropdown(e.target.value);
              }}
              value={selectUserDropdown}
              id="pet_id"
            >
              <option value={""} hidden disabled>
                Please Select An Owner
              </option>
              {petOwners?.map((owner) => {
                return (
                  <option key={owner.username} value={owner.username}>
                    {owner.username}
                  </option>
                );
              })}
            </select>
            <button className="float-right bg-lightblue hover:bg-mediumblue text-white font-bold py-2 px-4 rounded-2xl w-64 ms-3">
              Add Task
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;