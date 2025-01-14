import { useEffect } from "react";
import { supaClient } from "./api/client";
import { Routes, Route, useNavigate } from "react-router-dom";
import CreateProfile from "./components/CreateProfile";
import { Session } from "@supabase/supabase-js";
import AuthWrapper from "./components/AuthWrapper";
import HomePage from "./components/HomePage";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = async (
      _event: string,
      _session: Session | null
    ) => {
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
        .eq("user_id", user.id);

      console.log(profileData);

      if (!profileData || !profileData[0] || !profileData[0].username) {
        navigate("/create-profile");
      } else {
        navigate("/home");
      }

      // navigate(session ? "/create-profile" : "/login"); // Temp for testing
    };

    const {
      data: { subscription },
    } = supaClient.auth.onAuthStateChange(handleAuthChange);

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/create-profile" element={<CreateProfile />} />
      <Route path="/login" element={<AuthWrapper />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}
