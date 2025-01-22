import convertMiliseconds from "./convertMiliseconds";
import { supaClient } from "../api/client";

const handlePointCalculation = async (
    pet_id: number,
    assigned_user: string,
    DueDate:number,
    task_difficulty:string,
  ) => {
    const { data } = await supaClient
          .from("users_pets")
          .select("*, users_profiles!inner(*)")
          .eq("pet_id", pet_id)
          .eq("users_profiles.username", assigned_user);
        if (data) {
          const points = data[0].task_points;
          const user_pet_id = data[0].user_pet_id;
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
        }
  };

  export default handlePointCalculation