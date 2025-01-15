import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import useSession from "./hooks/useSession";
import useAuthRedirect from "./hooks/useAuthRedirect";
import AddPet from "./pages/AddPet";

export default function App() {
  const session = useSession();

  useAuthRedirect();

  return (
  <>
    <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        {session && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/create-profile" element={<CreateProfile />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={session ? "/home" : "/login"} replace />}
        />
        <Route
          path="/add-pet"
          element={session ? <AddPet /> : <Navigate to="/add-pet" />}
        />
        <Route path="*" element={<Navigate to={session ? "/home" : "/"} />} />
      </Routes>
  <Footer />
    </>
  );
}
