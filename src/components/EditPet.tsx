import { useState, useEffect } from "react";
import { supaClient } from "../api/client";

interface PetCardProp {
  petSelect: number;
}

const EditPet: React.FC<PetCardProp> = ({ petSelect }) => {
  const [newPetNotes, setNewPetNotes] = useState("");
  const [existingNotes, setExistingNotes] = useState<string | null>(null);
  const [petName, setPetName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetData = async () => {
      const { data, error } = await supaClient
        .from("pets")
        .select("pet_care_info, pet_name")
        .eq("pet_id", petSelect)
        .single();

      if (error) {
        console.log(error);
      } else if (data) {
        setExistingNotes(data.pet_care_info);
        setPetName(data.pet_name);
      }
    };

    if (petSelect) {
      fetchPetData();
    }
  }, [petSelect]);

  const handleNotesUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newPetNotes.trim()) {
      setErrorMessage("Note cannot be empty.");
      return;
    }

    setErrorMessage(null);

    const {
      data: { user },
    } = await supaClient.auth.getUser();
    if (!user) {
      return;
    }

    setIsLoading(true);

    const timestamp = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const updatedNotes = existingNotes
      ? `${existingNotes}\n[${timestamp}] ${newPetNotes}`
      : `[${timestamp}] ${newPetNotes}`;

    const { error } = await supaClient
      .from("pets")
      .update({ pet_care_info: updatedNotes })
      .eq("pet_id", petSelect);

    setIsLoading(false);

    if (error) {
      console.log(error);
      return;
    }

    alert("Note saved successfully!");
    setExistingNotes(updatedNotes);
    setNewPetNotes("");
  };

  return (
    <div className="bg-white w-full shadow-lg rounded-lg p-6 sm:p-8 text-navy mx-auto max-w-screen-lg">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 sm:mb-6">
        {petName ? `${petName}'s Notes` : "Loading..."}
      </h2>

      <h3 className="text-base sm:text-lg font-semibold my-4">
        Notes history:
      </h3>
      <pre className="border p-4 rounded bg-gray-100 mb-6 text-gray-700 whitespace-pre-wrap max-h-96 overflow-y-auto">
        {existingNotes || "No notes available for this pet."}
      </pre>

      {errorMessage && (
        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
      )}

      <form onSubmit={handleNotesUpdate} className="flex flex-col gap-4">
        <textarea
          className="outline-none border rounded-lg p-4 w-full h-56 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 resize-none"
          value={newPetNotes}
          onChange={(e) => setNewPetNotes(e.target.value)}
          placeholder="Enter a new note about your pet here..."
        ></textarea>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-lightblue py-3 rounded-lg text-white font-semibold hover:bg-mediumblue ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Saving..." : "Save Note"}
        </button>
      </form>
    </div>
  );
};

export default EditPet;
