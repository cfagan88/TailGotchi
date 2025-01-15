import { Database } from "./database.types";

export type Task = Database["public"]["Tables"]["tasks"]["Row"];

export type Pet = Database["public"]["Tables"]["pets"]["Row"];

export type UserProfile = Database["public"]["Tables"]["users_profiles"]["Row"];
