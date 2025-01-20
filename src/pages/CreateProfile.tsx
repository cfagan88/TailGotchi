import { useState } from "react";
import { supaClient } from "../api/client";
import { useNavigate } from "react-router-dom";
import bouncingStar from "../assets/animations and images/bouncing-star.gif";
import CharacterSelection from "../components/CharacterSelection";

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

  const validateInput = (value: string, isRequired: boolean = false) => {
    const inputRegex = /^[\p{L}\p{M}'-.!]+(?: [\p{L}\p{M}'-.!]+)*$/u;
    if (isRequired && value.trim() === "") {
      return "This field is required.";
    } else if (value.trim() !== "" && !inputRegex.test(value)) {
      return "Please use only letters, spaces, and standard punctuation.";
    }
    return null;
  };

  const handleBlur = (
    field: "username" | "name" | "avatarUrl",
    value: string,
    isRequired: boolean = false
  ) => {
    const error = validateInput(value, isRequired);
    setFormError((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

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
    <div className="p-8 bg-primarylight">
      <div className="flex text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-navy font-bold">
          Create Your Profile
        </h1>
        <img className="w-10 h-10" src={bouncingStar} alt="bouncing star" />
      </div>
      <div className="text-left">
        <p className="mt-2 text-navy text-base md:text-xl">
          Choose a username that represents you, add your name (if you like),
          and pick an avatar that suits your style.
        </p>
      </div>
      <main className="text-navy flex flex-col space-y-6 justify-center items-center w-full h-full my-10">
        <div className="rounded-lg bg-navy text-white w-full  max-w-6xl md:max-w-4xl lg:max-w-3xl p-6">
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
              onBlur={() => handleBlur("username", username || "", true)}
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
              onBlur={() => handleBlur("name", name || "", false)}
              className={`bg-white text-navy w-full p-3 border ${
                formError.name ? "border-red-500" : "border-mediumblue"
              } rounded-lg`}
            />
            {formError.name && (
              <p className="text-red-500 text-sm">{formError.name}</p>
            )}

            <label className="text-2xl font-bold">Choose your character:</label>
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
              className="w-full bg-mediumblue text-white font-bold py-2 px-4 rounded-xl border-2 border-lightblue hover:bg-lightblue hover:border-mediumblue hover:border-2 mx-auto block"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfileCreation;
