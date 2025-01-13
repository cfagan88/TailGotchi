import { useRef } from "react";

const AboutUs = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  const handleScrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="about-us text-left">
      <div className="introduction-to-tailgotchi bg-primarylight p-8 flex flex-col lg:flex-row items-center gap-8 rounded-b-xl">
        <div className="w-full lg:w-1/2">
          <h1 className="font-jersey25 text-h2 text-navy mb-4 ">About Us</h1>
          <p className="mb-4">
            Tailgotchi is an interactive app designed to make dog care fun and
            collaborative. It helps pet owners stay on top of their dog's care
            routine by offering a personalised, engaging platform to track
            essential tasks like feeding, walking, grooming, and vet
            appointments.
          </p>
          <p className="mb-4">
            With the added twist of collaboration, Tailgotchi allows users to
            create and share their pet profiles with family members, roommates,
            or caretakers - so everyone involved can stay on the same page.
          </p>
          <p className="mb-4">
            Tailgotchi turns routine dog care into a fun and rewarding
            experience. Owners can set up schedules, receive helpful reminders,
            and track their dog's progress with fun animations and interactive
            elements. Whether at home, work, or on vacation, you'll never have
            to worry about missing an important task.
          </p>
          <button
            className="bg-lightblue px-20 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue"
            onClick={handleScrollToContact}
          >
            Contact Us
          </button>
        </div>
        <div className="w-full lg:w-1/2 bg-navy rounded-xl flex items-center justify-center m-8">
          <img
            className="w-30 h-30"
            src="src/assets/images/dog-nodding.gif"
            alt="tailgotchi-nodding"
          />
        </div>
      </div>

      <div className="tailgotchi-solutions grid grid-cols-1 sm:grid-cols-2 gap-8 bg-primarydark p-8 my-8 rounded-xl">
        <div className="solution-item p-3">
          <h2 className="font-jersey25 text-h3 text-navy">
            Consistent pet care
          </h2>
          <p>
            Many pet owners struggle to remember all the little details that go
            into caring for their dog like feeding at the right time, taking
            them for a walk, or ensuring they're on track with grooming.
            Tailgotchi solves this by providing a simple, organised system for
            tracking care routines, ensuring nothing gets overlooked.
          </p>
        </div>
        <div className="solution-item p-3">
          <h2 className="font-jersey25 text-h3 text-navy">
            Collaboration between pet caretakers
          </h2>
          <p>
            Pet care often involves multiple people such as partners, family
            members, dog walkers, or sitters. Tailgotchi makes it easy for
            owners to share a pet's profile, schedule, and notes. You can keep
            everyone in the loop, assign tasks, and leave reminders to one
            another. With everyone on the same page, it's easier to maintain
            consistency in your dog's care routine, even if you're not the only
            one handling it.
          </p>
        </div>
        <div className="solution-item p-3">
          <h2 className="font-jersey25 text-h3 text-navy">
            Motivation and accountability
          </h2>
          <p>
            Pet care can sometimes feel like a repetitive chore, leading to
            burnout or forgetfulness. Tailgotchi adds an element of fun and
            motivation to the process. With playful animations, achievement
            badges, and progress tracking, completing care tasks becomes more
            rewarding and less of a routine obligation. Plus, the app keeps
            track of everything in one place, helping owners stay accountable
            and motivated to keep their pets happy and healthy.
          </p>
        </div>
        <div className="solution-item p-3">
          <h2 className="font-jersey25 text-h3 text-navy">
            Reducing stress around pet care
          </h2>
          <p>
            Juggling work, personal life, and pet responsibilities can be
            stressful. Tailgotchi helps reduce this stress by acting as a
            central hub for pet care information and reminders. By automatically
            sending notifications for upcoming tasks and appointments, the app
            allows owners to focus more on quality time with their dogs rather
            than worrying about missing something important.
          </p>
        </div>
      </div>

      <div
        id="contact-info"
        ref={contactRef}
        className="bg-primarylight p-8 rounded-t-xl"
      >
        <h2 className="text-h2 font-jersey25 text-navy text-center">
          Contact Information
        </h2>

        <div className="tailgotchi-location mb-4">
          <h3 className="text-h3 font-jersey25 text-navy">Location</h3>
          <p>
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
          <h3 className="text-h3 font-jersey25 text-navy">Business Hours</h3>
          <p>
            <span className="font-bold">Monday - Friday:</span> 9:00 AM - 5:00
            PM
          </p>
          <p>
            <span className="font-bold">Saturday:</span> Closed
          </p>
          <p>
            <span className="font-bold">Sunday:</span> Closed
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
