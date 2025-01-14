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
    return(
      <>
        <Header />
        <main className="bg-primarylight flex flex-col space-y-4 justify-center items-center m-auto w-screen h-[70vh]">
          <h1 className="font-jersey25 text-navy">Profile Creation</h1>
          <div className="rounded-md border-4 border-mediumblue bg-lightblue shadow shadow-navy h-[50%] flex items-center">
            <form className="m-auto flex flex-col space-y-4">
              <label>Username:</label>
              <input type="text" className="bg-primarylight"></input>
              <label>First Name:</label>
              <input type="text" className="bg-primarylight"></input>
              <label>Last Name:</label>
              <input type="text" className="bg-primarylight"></input>
              <input type="file"></input>
            </form>
          </div>
        </main>
        <Footer />
      </>
    ) 
  }
}
