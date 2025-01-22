import SelectedPet from "../components/SelectedPet";
import { useState, useEffect } from "react";
import { supaClient } from "../api/client";

interface PetCardProp {
  petSelect: number;
  setPetSelect: React.Dispatch<React.SetStateAction<null | number>>;
}

const PetProfiles: React.FC<PetCardProp> = ({ petSelect, setPetSelect }) => {
  const [pet, setPet] = useState<null | string>(null);
  const [fetchError, setFetchError] = useState<null | string>(null);

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
    fetchPet();
  }, [pet]);

  return (
    <div className="text-left bg-primarylight text-navy items-left">
      <main className="flex flex-col space-y-4 justify-center m-auto w-screen min-h-[70vh] text-left">
        <div className="bg-primarylight rounded-xl p-8">
          <h1 className="text-6xl font-extrabold mb-10">{`${pet}'s Profile`}</h1>
          <div className="flex flex-col items-center justify-center">
            <SelectedPet petSelect={petSelect} setPetSelect={setPetSelect} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PetProfiles;
