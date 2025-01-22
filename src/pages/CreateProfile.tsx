import { useState } from "react";
import { supaClient } from "../api/client";
import { useNavigate } from "react-router-dom";
import CharacterSelection from "../components/CharacterSelection";
import validateInput from "../utils/validateInput";
import handleBlur from "../utils/handleBlur";
import FAQSection from "../components/FaqSection";
import HowItWorks from "../components/HowItWorks";
import animatedFemale from "../assets/animations and images/female-three-and-dog-animated.gif";

const ProfileCreation: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [formError, setFormError] = useState({
    username: null as string | null,
    name: null as string | null,
    avatarUrl: null as string | null,
    message: null as string | null,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const usernameError = validateInput(username, true);
    const nameError = validateInput(name || "", false);
    const avatarUrlError =
      avatarUrl.trim() === "" ? "Please select a character." : null;

    if (usernameError || nameError || avatarUrlError) {
      setFormError({
        username: usernameError,
        name: nameError,
        avatarUrl: avatarUrlError,
        message: "Please correct the errors above before submitting.",
      });
      return;
    }

    setFormError({
      username: null,
      name: null,
      avatarUrl: null,
      message: null,
    });

    const {
      data: { user },
    } = await supaClient.auth.getUser();

    if (!user) {
      navigate("/");
    } else {
      try {
        const { data } = await supaClient
          .from("users_profiles")
          .insert([
            {
              user_id: user.id,
              username: username,
              name: name,
              avatar_url: avatarUrl,
            },
          ])
          .select();

        if (data) {
          setFormError({
            username: null,
            name: null,
            avatarUrl: null,
            message: null,
          });
          navigate("/home");
        }
      } catch (error) {
        setFormError({
          ...formError,
        });
      }
    }
  };

  return (
    <>
      <div className="introduction-to-tailgotchi min-h-screen flex flex-col lg:flex-row justify-between items-center gap-8 lg:p-12 bg-navy">
        <div className="p-8 text-white">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
            Welcome to TailGotchi!
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Simplifying Dog Care,{" "}
            <span className="underline text-lightblue">Together!</span>
          </h1>
          <p className="mb-6 text-sm sm:text-base md:text-lg">
            Track, manage, and collaborate on your dog's care routine with
            TailGotchi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#how-it-works"
              className="text-white px-6 md:px-8 py-3 rounded-full font-bold text-center border-2 border-lightblue hover:bg-lightblue hover:text-white"
            >
              Get started
            </a>
            <a
              href="#faq"
              className="text-white px-6 md:px-8 py-3 rounded-full font-bold text-center border-2 border-lightblue hover:bg-lightblue hover:text-white"
            >
              Learn more
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img
            className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-xl"
            src={animatedFemale}
            alt="animated female character"
          />
        </div>
      </div>

      <HowItWorks />

      <section id="profile-creation" className="py-12 px-8 bg-navy">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center mb-12">
          Create Your Profile
        </h2>
        <p className="text-center text-white text-base md:text-xl mb-6">
          Choose a username that represents you, add your name (if you like),
          and pick an avatar that suits your style.
        </p>
        <main className="flex flex-col items-center w-full">
          <div className="rounded-lg bg-navy text-white w-full max-w-3xl p-6 border-2 border-actuallightblue">
            <form className="flex flex-col space-y-6">
              <label className="text-2xl font-bold">Username:</label>
              <input
                type="text"
                minLength={6}
                maxLength={30}
                value={username}
                className={`bg-white text-navy w-full p-3 border ${
                  formError.username ? "border-red-500" : "border-mediumblue"
                } rounded-lg`}
                required
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => handleBlur("username", username || "", true , setFormError)}
              />
              {formError.username && (
                <p className="text-red-500 text-sm">{formError.username}</p>
              )}

              <label className="text-2xl font-bold">Name (optional):</label>
              <input
                type="text"
                maxLength={70}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur("name", name || "", false , setFormError)}
                className={`bg-white text-navy w-full p-3 border ${
                  formError.name ? "border-red-500" : "border-mediumblue"
                } rounded-lg`}
              />
              {formError.name && (
                <p className="text-red-500 text-sm">{formError.name}</p>
              )}

              <label className="text-2xl font-bold">
                Choose your character:
              </label>
              <CharacterSelection
                selectedCharacter={avatarUrl}
                onSelect={(character) => setAvatarUrl(character)}
              />
              {formError.avatarUrl && (
                <p className="text-red-500 text-sm">{formError.avatarUrl}</p>
              )}

              {formError.message && (
                <p className="text-red-500 text-sm font-bold">
                  {formError.message}
                </p>
              )}

              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-navy text-white font-bold py-2 px-4 rounded-xl border-2 border-lightblue hover:bg-lightblue hover:border-white"
              >
                Submit
              </button>
            </form>
          </div>
        </main>
      </section>
      <FAQSection />
    </>
  );
};

export default ProfileCreation;
