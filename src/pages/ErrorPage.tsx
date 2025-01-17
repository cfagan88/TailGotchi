import { Link } from "react-router-dom";
import sadDog from "../assets/animations and images/sad-dog.gif";

const ErrorPage = () => {
  return (
    <div className="bg-primarylight size-full text-navy flex flex-wrap md:flex-nowrap my-4 p-8 rounded-xl">
      <div className="error-page-intro flex flex-col w-full md:w-1/2 content-center text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Ooops...</h1>
        <h2 className="text-3xl md:text-5xl font-semibold mb-8">
          Sad doggo couldn't find his way
        </h2>
        <p className="w-full md:w-auto mb-10">
          The page you are looking for doesn't exist or another error occurred,
          go back to the home page.
        </p>
        <Link
          to="/home"
          className="inline-block text-center bg-lightblue px-4 md:px-6 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue md:w-72"
        >
          Go back
        </Link>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
        <img
          src={sadDog}
          alt="Sad tailgotchi"
          className="w-48 h-48 md:w-80 md:h-80"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
