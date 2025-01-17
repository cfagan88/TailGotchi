import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="flex items-center p-4 sm:p-6 bg-navy text-lightblue flex-wrap">
      <h1 className="text-2xl sm:text-4xl font-extrabold flex-1 text-left">
        TailGotchi
      </h1>
      <NavBar />
    </header>
  );
};

export default Header;
