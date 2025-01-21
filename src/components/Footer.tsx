import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-navy p-8 text-actuallightblue text-sm">
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-left mb-4">
            Tailgotchi
          </h3>
          <p className="mb-4">Keep your dog's routine on track, together.</p>

          <div className="socials flex mt-2 gap-6">
            <Link
              to="https://www.linkedin.com/"
              target="_blank"
              className="bg-mediumblue rounded-full p-3 sm:p-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
              aria-label="Link to our LinkedIn page"
            >
              <FaLinkedin className="text-white text-xl sm:text-2xl" />
            </Link>
            <Link
              to="https://www.facebook.com/"
              target="_blank"
              className="bg-mediumblue rounded-full p-3 sm:p-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
              aria-label="Link to our Facebook page"
            >
              <FaFacebook className="text-white text-xl sm:text-2xl" />
            </Link>
            <Link
              to="https://www.instagram.com/"
              target="_blank"
              className="bg-mediumblue rounded-full p-3 sm:p-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
              aria-label="Link to our Instagram page"
            >
              <FaInstagram className="text-white text-xl sm:text-2xl" />
            </Link>
          </div>
        </div>

        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Important Pages
          </h3>
          <ul className="space-y-2 mb-4">
            <li>
              <Link to="/home" className="hover:text-mediumblue">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-mediumblue">
                About
              </Link>
            </li>
            <li>
              <Link to="/profile-creation" className="hover:text-mediumblue">
                Create a profile
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-1/3 align-middle items-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Contact Info</h3>
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
