import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supaClient } from "./api/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import ProfileCreation from "./components/ProfileCreation";

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

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              !session ? (
                <div className="bg-primarylight flex justify-center m-auto w-screen h-[70vh]">
                  <Auth
                    supabaseClient={supaClient}
                    providers={["google"]}
                    appearance={{ theme: ThemeSupa }}
                  />
                </div>
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/home"
            element={session ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/about"
            element={session ? <AboutUs /> : <Navigate to="/" />}
          />
          <Route 
            path="/profile-creation"
            element={session ? <ProfileCreation /> : <Navigate to="/" />}
          />

          <Route path="*" element={<Navigate to={session ? "/home" : "/"} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
