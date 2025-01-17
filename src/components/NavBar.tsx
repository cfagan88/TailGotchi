import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supaClient } from "../api/client";
import useSession from "../hooks/useSession";

const NavBar = () => {
  const navigate = useNavigate();
  const session = useSession();
  async function signOut() {
    const { error } = await supaClient.auth.signOut();
    if (error) {
      console.log(error);
    }
    navigate("/");
  }

  return (
    <nav className="w-screen h-[10vh] m-auto overflow-hidden">
      <ul className="overflow-hidden">
        <li className="float-left bg-lightblue hover:bg-mediumblue">
          <Link to="/" className="block text-center p-8">
            Home
          </Link>
        </li>
        <li className="float-left bg-lightblue hover:bg-mediumblue">
          <Link to="/about" className="block text-center p-8">
            About
          </Link>
        </li>
        <li className="float-left bg-lightblue hover:bg-mediumblue">
          <Link to="/add-pet" className="block text-center p-8">
            Add Pet
          </Link>
        </li>
        <li className="float-left bg-lightblue hover:bg-mediumblue">
          <Link to="/my-tasks" className="block text-center p-8">
            My Tasks
          </Link>
        </li>
        {session && (
          <li className="float-left bg-lightblue hover:bg-mediumblue">
            <button className="block text-center p-8" onClick={signOut}>
              Sign out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
