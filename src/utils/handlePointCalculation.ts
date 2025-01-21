import convertMiliseconds from "./convertMiliseconds";
import { supaClient } from "../api/client";

const handlePointCalculation = async (
    points: number,
    user_pet_id: number,
    DueDate:number,
    task_difficulty:string,
  ) => {
    const daysRemainingOnTask = Number(
      convertMiliseconds(DueDate - Date.now(), "d")
    );
    let pointGain = 0;
    if (task_difficulty === "Easy") {
      pointGain += 10;
    } else if (task_difficulty === "Medium") {
      pointGain += 20;
    } else {
      pointGain += 30;
    }
    if (daysRemainingOnTask < 0) {
      pointGain=pointGain * daysRemainingOnTask
    }
    await supaClient
      .from("users_pets")
      .update({ task_points: (pointGain+points) })
      .eq("user_pet_id", user_pet_id);
  };

  export default handlePointCalculation