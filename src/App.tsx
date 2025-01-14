import { useEffect } from "react";
import { supaClient } from "./api/client";
import { Routes, Route, useNavigate } from "react-router-dom";
import CreateProfile from "./components/CreateProfile";
import { Session } from "@supabase/supabase-js";
import AuthWrapper from "./components/AuthWrapper";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = (_event: string, session: Session | null) => {
      navigate(session ? "/create-profile" : "/login");
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
    </Routes>
  );
}
