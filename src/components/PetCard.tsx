import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import { Pet } from "../api/global.types";

const PetCard = () => {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [petData, setPetData] = useState<null | Pet[]>(null);

  useEffect(() => {
    const fetchPets = async () => {
      const {
        data: { user },
      } = await supaClient.auth.getUser();
      if (!user) {
        return;
      }

      const { data, error } = await supaClient
        .from("users_pets")
        .select("pets(*)")
        .eq("user_id", user.id);

      if (error) {
        setFetchError("Could not fetch pet data");
        setPetData(null);
        console.log(error);
      }

      if (data) {
        const pets = data.map((item) => item.pets);
        setPetData(pets);
        setFetchError(null);
      }
    };

    fetchPets();
  }, []);

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {petData && petData.length === 0 && (
        <article className="border-2 border-mediumblue bg-lightblue rounded-lg min-w-[20%] max-fw-[40%] max-h-[40%] min-h-[20%] shadow-md shadow-lightblue">
          <p className="text-navy">You currently have no pets to display.</p>
        </article>
      )}
      {petData && (
        <>
          {petData.map((pet) => (
            <article
              key={pet.pet_id}
              className="border-2 border-mediumblue bg-lightblue rounded-lg min-w-[20%] max-w-[40%] max-h-[40%] min-h-[20%] shadow-md shadow-lightblue"
            >
              <p className="text-navy">Name: {pet.pet_name}</p>
              <p className="text-navy">Age: {pet.pet_age}</p>
              <p className="text-navy">Breed: {pet.breed}</p>
              <p className="text-navy">Gender: {pet.gender}</p>
              <p className="text-navy">Care notes: {pet.pet_care_info}</p>
              <p className="text-navy">Pet dislikes: {pet.pet_dislikes}</p>
              <p className="text-navy">Pet likes: {pet.pet_likes}</p>
            </article>
          ))}
        </>
      )}
    </>
  );
};

export default PetCard;
