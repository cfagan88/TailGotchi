import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supaClient } from "./client";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import ProfileCreation from "./components/ProfileCreation";
import useSession from "./hooks/useSession";

export default function App() {
  const session = useSession();

  return (
    <>
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
    </>
  );
}
