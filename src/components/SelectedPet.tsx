import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import { Pet } from "../api/global.types";

interface PetCardProp {
  petSelect: number;
  setPetSelect: React.Dispatch<React.SetStateAction<null | number>>;
}

const SelectedPet: React.FC<PetCardProp> = ({ petSelect, setPetSelect }) => {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [petData, setPetData] = useState<null | Pet[]>(null);
  const [colabForm, setColabForm] = useState<boolean>(false);
  const [colabUsername,setColabUsername]=useState<string>("")

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
        console.log(petData);
        setFetchError(null);
      }
    };

    fetchPets();
  }, []);

  const handleReturn = () => {
    setPetSelect(null);
  };

  const handleShowForm = () => {
    setColabForm(true);
  };

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    setColabForm(false)
    const userData = await supaClient.from('users_profiles')
    .select()
    .eq('username',colabUsername);
    if(userData.data&&userData.data.length){
      console.log("correct username")
      console.log(userData.data[0].user_id, petSelect)
      try {
       await supaClient.from('users_pets').insert([{user_id:userData.data[0].user_id, pet_id:petSelect}])
      }
      catch (error){
        console.log(error)
      }
      setColabUsername("")
    }else{
      console.log("incorrect username")
    }
  };
  
  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {petData && (
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
            <p className="text-navy">Care notes: {petData[0].pet_care_info}</p>
            <p className="text-navy">Pet dislikes: {petData[0].pet_dislikes}</p>
            <p className="text-navy">Pet likes: {petData[0].pet_likes}</p>
          </article>
          {!colabForm ? (
            <button
              onClick={handleShowForm}
              className="bg-lightblue rounded-lg border-2 border-mediumblue"
            >
              Add Co-owner
            </button>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2>Colab form</h2>
              <input required className={`w-full p-2 mt-1 border rounded navy bg-white text-navy`} placeholder="Username" value={colabUsername} onChange={(e)=>{setColabUsername(e.target.value)}}/>
              <button className="bg-lightblue rounded-lg border-2 border-mediumblue">
                Add Co-Owner
              </button>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default SelectedPet;
