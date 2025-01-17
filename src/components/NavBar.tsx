import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supaClient } from "../api/client";
import useSession from "../hooks/useSession";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const navigate = useNavigate();
  const session = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  async function signOut() {
    const { error } = await supaClient.auth.signOut();
    if (error) {
      console.log(error);
    }
    navigate("/");
  }

  return (
    <nav className="w-full sm:w-auto">
      <div className="sm:hidden flex justify-end">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-lightblue p-2"
        >
          <GiHamburgerMenu className="w-6 h-6  text-lightblue" />
        </button>
      </div>

      <ul
        className={`${
          menuOpen ? "block" : "hidden"
        } sm:flex flex-col sm:flex-row items-center sm:gap-8 text-lg`}
      >
        <li>
          <Link to="/" className="hover:text-mediumblue py-2 sm:py-0">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-mediumblue py-2 sm:py-0">
            About
          </Link>
        </li>
        <li>
          <Link to="/add-pet" className="hover:text-mediumblue py-2 sm:py-0">
            Add Pet
          </Link>
        </li>
        <li>
          <Link to="/my-tasks" className="hover:text-mediumblue py-2 sm:py-0">
            My Tasks
          </Link>
        </li>
        {session && (
          <li className="mt-4 sm:mt-0">
            <button
              className="bg-lightblue px-6 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue"
              onClick={signOut}
            >
              Sign out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
