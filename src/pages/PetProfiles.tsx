import PetCard from "../components/PetCard";

const PetProfiles = () => {
  return (
    <>
      <h1 className="bg-primarylight text-navy">Your Pets:</h1>
      <main className="bg-primarylight text-navy flex space-x-4 justify-center items-center m-auto w-screen h-[70vh]">
        <PetCard />
      </main>
    </>
  );
};

export default PetProfiles;
