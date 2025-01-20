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
        <>
          
          <main className="bg-primarylight  text-navy flex flex-col space-y-4 items-center justify-center m-auto w-screen min-h-[70vh]">
            <OwnerDetails />
            <div className="bg-primarylight flex-wrap space-x-3 space-y-4 text-navy flex items-center justify-center m-auto">
              <PetCards setPetSelect={setPetSelect} />
            </div>
          </main>
          
        </>
      ) : (
        <PetProfiles petSelect={petSelect} setPetSelect={setPetSelect} />
      )}
    </>
  );
};

export default OwnerProfile;
