const Header = () => {
  return(
    <header className="w-screen bg-primarydark h-[20vh]">
      <h1 className="h-[10vh] font-jersey25">TailGotchi</h1>
      <nav className="w-screen h-[10vh] m-auto overflow-hidden">
                <ul className="overflow-hidden">
                    <li className="float-left bg-lightblue hover:bg-mediumblue"><a href="#home" className="block text-center p-8">Home</a></li>
                    <li className="float-left bg-lightblue hover:bg-mediumblue"><a href="#about" className="block text-center p-8">About</a></li>
                    
                    
                    </ul>
            </nav>
    </header>
  );
};

export default Header;
