import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center p-4 sm:p-6 bg-navy text-lightblue flex-wrap w-screen cursor-pointer">
      <a
        className="transition left-0 bg-lightblue text-navy absolute  -translate-y-36 focus:translate-y-0"
        href="#tasks-main"
      >
        Skip Navigation
      </a>
      <h1
        onClick={() => {
          navigate("/home");
        }}
        className="text-2xl sm:text-4xl font-extrabold flex-1 text-left"
      >
        TailGotchi
      </h1>
      <NavBar />
    </header>
  );
};

export default Header;
