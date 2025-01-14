import { useNavigate } from "react-router-dom";
import { supaClient } from "../api/client";
import { useEffect } from "react";

export default function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = async () => {
      const {
        data: { user },
      } = await supaClient.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data: profileData } = await supaClient
        .from("users_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!profileData || !profileData.username) {
        navigate("/create-profile");
      } else {
        navigate("/home");
      }
    };

    handleAuthChange();

    const {
      data: { subscription },
    } = supaClient.auth.onAuthStateChange(handleAuthChange);

    return () => subscription?.unsubscribe();
  }, [navigate]);
}
