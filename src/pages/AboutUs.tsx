import { useRef } from "react";
import dogNodding from "../assets/animations and images/dog-nodding.gif";

const AboutUs = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  const handleScrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="about-us text-navy">
      <div className="introduction-to-tailgotchi min-h-screen flex flex-col lg:flex-row justify-between items-center gap-8 p-6 lg:p-12">
        <div className="lg:w-1/2 flex flex-col">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            About Us
          </h1>
          <p className="mb-4 text-sm sm:text-base md:text-lg">
            Tailgotchi is an interactive app designed to make dog care fun and
            collaborative. It helps pet owners stay on top of their dog's care
            routine by offering a personalised, engaging platform to track
            essential tasks like feeding, walking, grooming, and vet
            appointments.
          </p>
          <p className="mb-4 text-sm sm:text-base md:text-lg">
            With the added twist of collaboration, Tailgotchi allows users to
            create and share their pet profiles with family members, roommates,
            or caretakers - so everyone involved can stay on the same page.
          </p>
          <p className="mb-6 text-sm sm:text-base md:text-lg">
            Tailgotchi turns routine dog care into a fun and rewarding
            experience. Owners can set up schedules, receive helpful reminders,
            and track their dog's progress with fun animations and interactive
            elements. Whether at home, work, or on vacation, you'll never have
            to worry about missing an important task.
          </p>
          <button
            className="w-64 inline-block text-center bg-lightblue px-6 md:px-8 py-3 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue"
            onClick={handleScrollToContact}
          >
            Contact Us
          </button>
        </div>
        <div className="lg:w-1/2 flex justify-end items-center">
          <img
            className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl bg-navy"
            src={dogNodding}
            alt="tailgotchi-nodding"
          />
        </div>
      </div>

      <div className="tailgotchi-solutions bg-primarydark text-navy py-12 min-h-[50vh]">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
          {[
            {
              title: "Consistent pet care",
              description:
                "Many pet owners struggle to remember all the little details that go into caring for their dog. Tailgotchi provides a simple, organised system for tracking care routines, ensuring nothing gets overlooked.",
            },
            {
              title: "Collaboration between pet caretakers",
              description:
                "Tailgotchi makes it easy for owners to share a pet's profile, schedule, and notes. Keep everyone in the loop, assign tasks, and leave reminders to maintain consistency in your dog's care routine.",
            },
            {
              title: "Motivation and accountability",
              description:
                "Tailgotchi adds an element of fun and motivation to pet care. With playful animations, achievement badges, and progress tracking, completing care tasks becomes more rewarding.",
            },
            {
              title: "Reducing stress around pet care",
              description:
                "Tailgotchi helps reduce stress by acting as a central hub for pet care information and reminders. Focus more on quality time with your dog rather than worrying about missing something important.",
            },
          ].map((solution, index) => (
            <div
              key={index}
              className="solution-item bg-primarylight p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                {solution.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        id="contact-info"
        ref={contactRef}
        className="bg-primarylight py-16 px-6 md:px-12 min-h-[40vh]"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="tailgotchi-location">
              <h3 className="text-2xl font-bold mb-4">Location</h3>
              <p className="text-sm sm:text-base md:text-lg">
                Tailgotchi Ltd.
                <br />
                123 Tail Street
                <br />
                London, E1 2AB
                <br />
                United Kingdom
              </p>
            </div>
            <div className="business-hours">
              <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
              <p className="text-sm sm:text-base md:text-lg">
                <span className="font-bold">Monday - Friday:</span> 9:00 AM -
                5:00 PM
              </p>
              <p className="text-sm sm:text-base md:text-lg">
                <span className="font-bold">Saturday:</span> Closed
              </p>
              <p className="text-sm sm:text-base md:text-lg">
                <span className="font-bold">Sunday:</span> Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
