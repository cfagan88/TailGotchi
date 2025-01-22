import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import { Pet } from "../api/global.types";
import dogNodding from "../assets/animations and images/dog-nodding.gif";
import { IoMdMale } from "react-icons/io";
import { IoFemale } from "react-icons/io5";
import { getMostRecentNote } from "../utils/getMostRecentNote";

interface PetCardProp {
  setPetSelect: React.Dispatch<React.SetStateAction<null | number>>;
}

const PetCards: React.FC<PetCardProp> = ({ setPetSelect }) => {
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

  const handlePetClick = (petId: number) => {
    setPetSelect(petId);
  };

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {petData && petData.length === 0 && (
        <article className="border-2 border-mediumblue bg-lightblue rounded-lg p-4 shadow-md">
          <p className="text-navy">You currently have no pets to display.</p>
        </article>
      )}
      {petData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {petData.map((pet) => (
            <article
              key={pet.pet_id}
              className="border-2 border-navy border-opacity-50 bg-white rounded-lg p-4 shadow-md flex flex-col"
            >
              <img
                src={dogNodding}
                alt={pet.pet_name || "Pet"}
                className={`w-20 h-20 object-cover rounded-full border-2 border-navy border-opacity-45 mb-4 mx-auto ${
                  pet.gender?.toLowerCase() === "female"
                    ? "bg-pink"
                    : pet.gender?.toLowerCase() === "male"
                    ? "bg-navy"
                    : "bg-gray-200"
                }`}
              />
              <div className="text-navy flex-grow">
                <div className="flex justify-center items-center mb-2">
                  <p className="font-bold pr-2">{pet.pet_name || "Unknown"}</p>
                  {pet.gender?.toLowerCase() === "male" ? (
                    <IoMdMale className="text-mediumblue" />
                  ) : pet.gender?.toLowerCase() === "female" ? (
                    <IoFemale className="text-pink" />
                  ) : null}{" "}
                </div>
                <p className="mb-2">
                  <span className="font-bold">Age:</span>{" "}
                  {pet.pet_age || "Unknown"} years old
                </p>
                <p className="mb-2">
                  <span className="font-bold">Breed:</span>{" "}
                  {pet.breed || "Unknown"}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Likes:</span>{" "}
                  {pet.pet_likes || "N/A"}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Dislikes:</span>{" "}
                  {pet.pet_dislikes || "N/A"}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Care notes:</span>{" "}
                  {getMostRecentNote(pet.pet_care_info)}
                </p>
              </div>
              <button
                onClick={() => handlePetClick(pet.pet_id)}
                className="mt-auto bg-mediumblue text-white font-bold py-2 px-4 rounded-lg hover:bg-lightblue"
              >
                Open pet profile
              </button>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default PetCards;
