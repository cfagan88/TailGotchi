import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-primarydark p-8 text-navy text-sm">
      <div className="flex justify-between mb-6">
        <div className="w-1/3 mb-4">
          <h3 className="font-jersey25 text-h2 mb-4">Tailgotchi</h3>
          <p>Keep your dog's routine on track, together.</p>
        </div>

        <div className="w-1/3 align-middle">
          <h3 className="text-h3 font-jersey25 mb-4">Important Pages</h3>
          <ul className="space-y-2 mb-4">
            <li>
              <Link to="/home" className="hover:text-lightblue">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-lightblue">
                About
              </Link>
            </li>
            <li>
              <Link to="/profile-creation" className="hover:text-lightblue">
                Create a profile
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-1/3">
          <h3 className="text-h3 font-jersey25 mb-4">Contact Info</h3>
          <p className="mb-4">
            Tailgotchi Ltd.
            <br />
            123 Tail Street
            <br />
            London, E1 2AB
            <br />
            United Kingdom
          </p>
        </div>
      </div>
      <div className="w-full text-center">
        <hr className="mb-3 text-navy text-opacity-50" />
        <p className="font-extralight italic text-xs">
          &copy; 2024 Tailgotchi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
