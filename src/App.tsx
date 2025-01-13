import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supaClient } from "./api/client";
import CreateProfile from "./components/CreateProfile";
import AuthWrapper from "./components/AuthWrapper";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supaClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supaClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <AuthWrapper />;
  } else {
    return <CreateProfile />;
  }
}
