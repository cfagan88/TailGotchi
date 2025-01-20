import SelectedPet from "../components/SelectedPet";

interface PetCardProp {
  petSelect: number;
  setPetSelect: React.Dispatch<React.SetStateAction<null | number>>;
}

const PetProfiles: React.FC<PetCardProp> = ({ petSelect, setPetSelect }) => {
  return (
    <div className="text-left bg-primarylight text-navy items-left">
      <main className="flex flex-col space-y-4 justify-center m-auto w-screen min-h-[70vh] text-left">
        <div className="bg-primarylight rounded-xl p-8">
          <h1 className="text-6xl font-extrabold mb-10">Pet Profile</h1>
          <div className="flex flex-col items-center justify-center">
            <SelectedPet petSelect={petSelect} setPetSelect={setPetSelect} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PetProfiles;
