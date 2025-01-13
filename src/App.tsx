import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supaClient } from "./api/client";
import CreateProfile from "./components/CreateProfile";

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
    return (
      <Auth
        supabaseClient={supaClient}
        providers={["google"]}
        appearance={{ theme: ThemeSupa }}
      />
    );
  } else {
    return <CreateProfile />;
  }
}
