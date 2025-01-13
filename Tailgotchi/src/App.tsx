import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supaClient } from "./client";

export default function App() {
  const [session, setSession] = useState(null);
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
    return <div>Logged in!</div>; // Route to Homepage here
  }
}
