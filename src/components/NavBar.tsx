import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supaClient } from "../api/client";
import useSession from "../hooks/useSession";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const navigate = useNavigate();
  const session = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    async function getCurrentUser() {
      const {
        data: { user },
      } = await supaClient.auth.getUser();

      if (user) {
        const { data } = await supaClient
          .from("users_profiles")
          .select("*, users!inner(*)")
          .eq("users.id", user.id);
        if (data) {
          setUser(data[0].username);
        }
      }
    }
    getCurrentUser();
  }, [session]);

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
          className="text-actuallightblue p-2"
          aria-label="Open menu on mobile only"
        >
          <GiHamburgerMenu className="w-6 h-6  text-actuallightblue" />
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
          <Link to="/my-profile" className="hover:text-mediumblue py-2 sm:py-0">
            My Profile
          </Link>
        </li>
        <li>
          <Link to="/my-tasks" className="hover:text-mediumblue py-2 sm:py-0">
            My Tasks
          </Link>
        </li>

        {session && (
          <div className="border-l-2">
            <li className="text-center font-bold">{user}</li>
            <li className="mt-4 sm:mt-0">
              <button
                className="px-4 py-1 text-sm  text-white hover:underline"
                onClick={signOut}
              >
                Sign out
              </button>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
