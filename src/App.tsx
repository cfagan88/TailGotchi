import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supaClient } from "./client";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
      <>
        <Header />
        <main className="bg-primarylight flex justify-center m-auto w-screen h-[70vh]">
        
          <Auth
          supabaseClient={supaClient}
          providers={["google"]}
          appearance={{ theme: ThemeSupa }}
          
          />
        
        </main>
        <Footer />
      </>
    );
  } else {
    return <div>Logged in!</div>; // Route to Homepage here
  }
}
