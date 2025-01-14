import { Link } from "react-router-dom";

const NavBar = () => {
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
          <Link to="/profile-creation" className="block text-center p-8">
            Create Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
