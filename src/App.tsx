import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supaClient } from "./api/client";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import useSession from "./hooks/useSession";
import AddPetPage from "./pages/AddPetPage";
import UserExists from "./components/UserExists";
import MyTasks from "./pages/MyTasks";
import ErrorPage from "./pages/ErrorPage";
import OwnerProfile from "./pages/OwnerProfile";

export default function App() {
  const session = useSession();
  const [profileExists, setProfileExists] = useState<boolean>(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supaClient.auth.getUser();

      if (user) {
        const { data } = await supaClient
          .from("users_profiles")
          .select("*, users!inner(*)")
          .eq("users.id", user.id);

        if (data) {
          setProfileExists(true);
        } else {
          setProfileExists(false);
        }
      }
    };
    checkUser();
  }, [profileExists]);

  return (
    <div className="bg-primarylight">
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
                <UserExists />
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
            element={session ? <CreateProfile /> : <Navigate to="/" />}
          />

          <Route
            path="/add-pet"
            element={session ? <AddPetPage /> : <Navigate to="/" />}
          />

          <Route
            path="/my-profile"
            element={session ? <OwnerProfile /> : <Navigate to="/" />}
          />

          <Route
            path="/my-tasks"
            element={session ? <MyTasks /> : <Navigate to="/" />}
          />

          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}
