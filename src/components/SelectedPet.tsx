import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import { Pet } from "../api/global.types";
import EditPet from "./EditPet";

interface PetCardProp {
  petSelect: number;
  setPetSelect: React.Dispatch<React.SetStateAction<null | number>>;
}

const SelectedPet: React.FC<PetCardProp> = ({ petSelect, setPetSelect }) => {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [petData, setPetData] = useState<null | Pet[]>(null);
  const [editState, setEditState] = useState<boolean>(false);

  useEffect(() => {
    const fetchPets = async () => {
      const {
        data: { user },
      } = await supaClient.auth.getUser();
      if (!user) {
        return;
      }

      const { data, error } = await supaClient
        .from("pets")
        .select()
        .eq("pet_id", petSelect);

      if (error) {
        setFetchError("Could not fetch pet data");
        setPetData(null);
        console.log(error);
      }

      if (data) {
        setPetData(data);
        setFetchError(null);
       
      }
    };

    fetchPets();
  }, []);

  const handleReturn = () => {
    setPetSelect(null);
  };

 

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {petData && (
        <>
          {!editState ? (
            <>
              <button
                onClick={handleReturn}
                className="bg-lightblue rounded-lg border-2 border-mediumblue"
              >
                return to owner profile
              </button>
              <article className="bg-lightblue rounded-lg border-2 border-mediumblue">
                <p className="text-navy">Name: {petData[0].pet_name}</p>
                <p className="text-navy">Age: {petData[0].pet_age}</p>
                <p className="text-navy">Breed: {petData[0].breed}</p>
                <p className="text-navy">Gender: {petData[0].gender}</p>
                <p className="text-navy">
                  Pet dislikes: {petData[0].pet_dislikes}
                </p>
                <p className="text-navy">Pet likes: {petData[0].pet_likes}</p>
                <p className="text-navy">
                  Care notes: {petData[0].pet_care_info}
                </p>
                <button onClick={() => setEditState(true)}>Edit profile</button>
              </article>
            </>
          ) : (
            <article>
            <EditPet petSelect={petSelect}/>
            <button onClick={() => setEditState(false)}>Return to pet profile</button>
            </article>
          )}
        </>
      )}
    </>
  );
};

export default SelectedPet;
