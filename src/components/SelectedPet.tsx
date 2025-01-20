import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import { Pet } from "../api/global.types";
import dogNodding from "../assets/animations and images/dog-nodding.gif";
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
  }, [petSelect]);

  const handleReturn = () => {
    setPetSelect(null);
  };

  return (
    <>
      {fetchError && <p className="text-red-500">{fetchError}</p>}
      {petData && (
        <div className="flex flex-col items-center">
          {!editState ? (
            <>
              <button
                onClick={handleReturn}
                className="bg-mediumblue text-white font-bold py-2 px-4 rounded-lg hover:bg-lightblue mb-4"
              >
                return to owner profile
              </button>
              <article className="border-2 border-navy border-opacity-50 bg-white rounded-lg p-6 shadow-md flex flex-col items-center max-w-md w-full">
                <img
                  src={dogNodding}
                  alt={petData[0].pet_name || "Pet"}
                  className={`w-32 h-32 object-cover rounded-full border-2 border-navy border-opacity-45 mb-4 ${
                    petData[0].gender?.toLowerCase() === "female"
                      ? "bg-pink"
                      : petData[0].gender?.toLowerCase() === "male"
                      ? "bg-navy"
                      : "bg-gray-200"
                  }`}
                />
                <div className="text-navy text-left">
                  <h2 className="text-2xl font-bold mb-2 text-center">
                    {petData[0].pet_name || "Unknown"}
                  </h2>
                  <p className="mb-2">
                    <span className="font-bold">Age:</span>{" "}
                    {petData[0].pet_age || "Unknown"} years old
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Breed:</span>{" "}
                    {petData[0].breed || "Unknown"}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Gender:</span>{" "}
                    {petData[0].gender || "Unknown"}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Likes:</span>{" "}
                    {petData[0].pet_likes || "N/A"}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Dislikes:</span>{" "}
                    {petData[0].pet_dislikes || "N/A"}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Care Notes:</span>{" "}
                    {petData[0].pet_care_info || "N/A"}
                  </p>
                </div>
                <button
                  onClick={() => setEditState(true)}
                  className="bg-mediumblue text-white font-bold py-2 px-4 rounded-lg hover:bg-lightblue mb-4"
                >
                  Edit profile
                </button>
              </article>
            </>
          ) : (
            <article className="border-2 border-navy border-opacity-50 bg-white rounded-lg p-6 shadow-md flex flex-col items-center max-w-md w-full">
              <EditPet petSelect={petSelect} />
              <button
                onClick={() => setEditState(false)}
                className="bg-mediumblue text-white font-bold py-2 px-4 rounded-lg hover:bg-lightblue mb-4"
              >
                Return to pet profile
              </button>
            </article>
          )}
        </div>
      )}
    </>
  );
};

export default SelectedPet;
