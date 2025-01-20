import { useState } from "react";
import { supaClient } from "../api/client";  

interface PetCardProp {
    petSelect: number;
    
  }

const EditPet: React.FC<PetCardProp> = ({ petSelect }) => {
  const [newPetNotes, setNewPetNotes] = useState("");
  

  const handleNotesUpdate = async (event: React.FormEvent) => {
    event.preventDefault();  
    const {
      data: { user },
    } = await supaClient.auth.getUser();
    if (!user) {
      return;
    }

    const { data, error } = await supaClient
      .from("pets")
      .update({ pet_care_info: newPetNotes })
      .eq("pet_id", petSelect)
      .select();

    if (error) {
      
      console.log(error);
      return;
    }

    if (data) {
      console.log(data, "update query");
      
    }
  };

  return (
    
      <form onSubmit={handleNotesUpdate}>
        <input
          type="text"
          value={newPetNotes}
          onChange={(e) => setNewPetNotes(e.target.value)}
        />
        <button type="submit">Save Notes</button>
      </form>
      
      
  );
};

export default EditPet;
