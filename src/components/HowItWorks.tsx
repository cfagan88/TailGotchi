const HowItWorks = () => {
  return (
    <>
      <section id="how-it-works" className="bg-lightblue py-12 px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy text-center mb-12">
          How TailGotchi Works
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {[
            {
              title: "Create Your Profile",
              description:
                "Set up your profile by choosing a username, adding your name, and selecting a character that represents you.",
            },
            {
              title: "Add Your Pets",
              description:
                "Create profiles for your pets with their details like age, breed, and care preferences.",
            },
            {
              title: "Track Tasks",
              description:
                "Manage your pet care routine with tasks like feeding, grooming, and vet visits.",
            },
            {
              title: "Collaborate",
              description:
                "Share responsibilities with family or friends to ensure your pet gets the best care.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center w-full sm:w-1/2 md:w-1/3 max-w-sm p-6 bg-white rounded-lg shadow-lg"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-lightblue mb-4">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
