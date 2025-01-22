export const getMostRecentNote = (notes: string | null): string => {
  if (!notes) {
    return "No notes available for this pet.";
  }

  const notesArray = notes.split("\n");
  return notesArray[notesArray.length - 1];
};
