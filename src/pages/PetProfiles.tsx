
import Footer from "../components/Footer";
import Header from "../components/Header";
import SelectedPet from "../components/SelectedPet";


interface PetCardProp {
  petSelect: number;
  setPetSelect: React.Dispatch<React.SetStateAction<null | number>>;
}

const PetProfiles: React.FC<PetCardProp> = ({ petSelect, setPetSelect }) => {
  return (
    <>
      <h1 className="bg-primarylight text-navy">Your Pets:</h1>
      <main className="bg-primarylight text-navy flex space-x-4 justify-center items-center m-auto w-screen h-[70vh]">
        <SelectedPet petSelect={petSelect} setPetSelect={setPetSelect} />
      </main>
    </>
  );
};

export default PetProfiles;
