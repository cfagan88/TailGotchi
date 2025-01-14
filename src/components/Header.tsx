import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-screen bg-primarydark h-[20vh]">
      <h1 className="h-[10vh] font-jersey25">TailGotchi</h1>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
