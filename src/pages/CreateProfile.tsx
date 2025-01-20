import { useState } from "react";
import { supaClient } from "../api/client";
import { useNavigate } from "react-router-dom";

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
    const avatarUrlError = validateInput(avatarUrl || "", false);

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
    <main className="bg-primarylight flex flex-col space-y-4 justify-center items-center m-auto w-screen h-[75vh]">
      <h1 className="font-jersey25 text-h2 text-navy">Profile Creation</h1>
      <div className="rounded-md border-4 border-mediumblue bg-lightblue shadow shadow-navy h-auto flex items-center ">
        <form className="m-auto flex flex-col space-y-4">
          <label>Username:</label>
          <input
            type="text"
            minLength={6}
            maxLength={30}
            value={username}
            className={`bg-primarylight text-navy w-full p-2 mt-1 border ${
              formError.username ? "border-red-500" : "border-mediumblue"
            } rounded`}
            required
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => handleBlur("username", username || "", false)}
          ></input>
          {formError.username && (
            <p className="text-red-500 text-sm">{formError.username}</p>
          )}
          <label>Name (optional):</label>
          <input
            type="text"
            maxLength={70}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur("name", name || "", false)}
            className={`bg-primarylight text-navy w-full p-2 mt-1 border ${
              formError.name ? "border-red-500" : "border-mediumblue"
            } rounded`}
          ></input>
          {formError.name && (
            <p className="text-red-500 text-sm">{formError.name}</p>
          )}
          <label>Avatar URL (optional):</label>
          <input
            type="text"
            pattern="https?:\/\/.*\.(jpg|jpeg|png|gif)$"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            onBlur={() => handleBlur("avatarUrl", avatarUrl || "", false)}
            className={`bg-primarylight text-navy w-full p-2 mt-1 border ${
              formError.avatarUrl ? "border-red-500" : "border-mediumblue"
            } rounded`}
          ></input>
          {formError.avatarUrl && (
            <p className="text-red-500 text-sm">{formError.avatarUrl}</p>
          )}
          {formError.message && (
            <p className="text-red-500 text-sm font-black">
              {formError.message}
            </p>
          )}
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-auto h-auto bg-primarylight text-navy"
            value={"Add to Profile"}
            formTarget="_self"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default ProfileCreation;
