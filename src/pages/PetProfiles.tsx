import SelectedPet from "../components/SelectedPet";
import { useState, useEffect } from "react";
import { supaClient } from "../api/client";
import { Task } from "../api/global.types";
import Lottie from "lottie-react";
import Loading from "../assets/animations and images/Loading.json";
import TaskCard from "../components/TaskCard";

interface PetCardProp {
  petSelect: number;
  setPetSelect: React.Dispatch<React.SetStateAction<null | number>>;
}

const PetProfiles: React.FC<PetCardProp> = ({ petSelect, setPetSelect }) => {
  const [pet, setPet] = useState<null | string>(null);
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    const {
      data: { user },
    } = await supaClient.auth.getUser();
    if (user) {
      const { data } = await supaClient
        .from("tasks")
        .select("*, pets!inner(*,users_pets!inner(*))")
        .eq("pets.users_pets.pet_id", petSelect)
        .neq("is_completed", true);
      data?.sort((a, b) => a.DueDate - b.DueDate);
      setTasks(data);
      setLoading(false);
      
    }
  };

  useEffect(() => {
    const fetchPet = async () => {
      const { data, error } = await supaClient
        .from("pets")
        .select()
        .eq("pet_id", petSelect);

      if (error) {
        setFetchError("Could not fetch pet data");
        console.log(fetchError);
        setPet(null);
      }

      if (data) {
        setPet(data[0].pet_name);
        setFetchError(null);
      }
    };

    

    getData();
    fetchPet();
  }, [pet]);

  useEffect(() => {
    setLoading(true);
    getData();
    supaClient
      .channel("tasks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },
        (_payload) => {
          getData();
        }
      )
      .subscribe();
  }, []);


  return (
    <div className="text-left bg-primarylight text-navy items-left">
      <main className="flex flex-col space-y-4 m-auto w-full min-h-[70vh] text-left px-4">
        <div className="bg-primarylight rounded-xl p-8">
          <h1 className="text-6xl font-extrabold mb-10">{`${pet}'s Profile`}</h1>
          <div className="flex flex-col space-y-4 items-center justify-center">
            <SelectedPet petSelect={petSelect} setPetSelect={setPetSelect} />
            {loading ? (
              <Lottie
                animationData={Loading}
                className="loading-animation size-24"
              />
            ) : (
              tasks && (
                <>
                <h1 className="text-2xl text-navy font-bold">Pet Tasks:</h1>
                <div className="flex flex-col space-y-4">
                  
                  {tasks.map((task) => {
                    return <TaskCard key={task.task_id} task={task} />;
                  })}

                </div>
                </>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PetProfiles;
