import { useEffect, useState } from "react";
import OwnerDetails from "../components/OwnerDetails";
import PetProfiles from "./PetProfiles";
import PetCards from "../components/PetCards";

const OwnerProfile = () => {
  const [petSelect, setPetSelect] = useState<null | number>(null);

  useEffect(() => {}, [petSelect]);

  return (
    <>
      {!petSelect ? (
        <div className="text-left bg-primarylight text-navy items-left">
          <main className="flex flex-col space-y-4  justify-center m-auto w-screen min-h-[70vh]  text-left">
            <div className="text-left bg-primarylight rounded-xl p-8">
              <h1 className="text-6xl font-extrabold mb-10">My Profile</h1>
              <OwnerDetails />
              <h2 className="text-4xl font-extrabold mb-5">My Pets</h2>
              <div className=" flex-wrap space-x-3 space-y-4 text-navy flex items-center justify-center m-auto p-4 rounded-xl">
                <PetCards setPetSelect={setPetSelect} />
              </div>
            </div>
          </main>
        </div>
      ) : (
        <PetProfiles petSelect={petSelect} setPetSelect={setPetSelect} />
      )}
    </>
  );
};

export default OwnerProfile;
