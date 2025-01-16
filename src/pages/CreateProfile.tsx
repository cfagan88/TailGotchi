// import { useState } from "react";
// import { supaClient } from "../api/client";
// import { useNavigate } from "react-router-dom";

// export default function CreateProfile() {
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [avatarUrl, setAvatarUrl] = useState("");
//   const [formError, setFormError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const navigate = useNavigate();
//     const {
//       data: { user },
//     } = await supaClient.auth.getUser();

//     console.log(user);

//     if (!user) {
//       setFormError("Error in fetching user ID");
//       return <p className="error"> {formError} </p>;
//     }

//     if (!username) {
//       setFormError("Please fill in all required fields");
//       // display error message
//       return;
//     }

//     try {
//       const { data } = await supaClient.from("users_profiles").insert([
//         {
//           user_id: user.id,
//           username: username,
//           name: name,
//           avatar_url: avatarUrl,
//         },
//       ]);

//       if (data) {
//         setFormError(null);
//         navigate("/home");
//       }
//     } catch (error) {
//       setFormError("Please fill in all required fields");
//       // display error message
//       // console.log(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Username (required)
//         <input
//           type="text"
//           minLength={6}
//           maxLength={30}
//           pattern="^[A-Za-z0-9_-]{6,20}$"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Name (optional)
//         <input
//           type="text"
//           maxLength={70}
//           pattern="^[A-Za-z\s'-]+$"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>
//       <label>
//         Avatar URL (optional)
//         <input
//           type="text"
//           pattern="https?:\/\/.*\.(jpg|jpeg|png|gif)$"
//           value={avatarUrl}
//           onChange={(e) => setAvatarUrl(e.target.value)}
//         />
//       </label>
//       <button type="submit">Create Profile</button>
//     </form>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supaClient } from "../api/client";

interface ComponentProps {
  setProfileExists: Function;
}

const ProfileCreation: React.FC<ComponentProps> = ({ setProfileExists }) => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supaClient.auth.getUser();
    if (!user) {
      setFormError("Error in fetching user ID");
      navigate("/");
    }
    if (!username) {
      setFormError("Please fill in all required fields");
      return;
    }
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
        console.log(data);
        setProfileExists(true);
        setFormError(null);
        navigate("/home");
      }
    } catch (error) {
      setFormError("Please fill in all required fields");
      console.log(error);
    }
  };

  return (
    <main className="bg-primarylight flex flex-col space-y-4 justify-center items-center m-auto w-screen h-[70vh]">
      <h1 className="font-jersey25 text-h2 text-navy">Profile Creation</h1>
      <div className="rounded-md border-4 border-mediumblue bg-lightblue shadow shadow-navy h-[50%] flex items-center">
        <form className="m-auto flex flex-col space-y-4">
          <label>Username:</label>
          <input
            type="text"
            className="bg-primarylight text-navy"
            required
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label>Name:</label>
          <input
            type="text"
            className="bg-primarylight text-navy"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label>Avatar URL (optional):</label>
          <input
            type="text"
            className="bg-primarylight text-navy"
            onChange={(e) => setAvatarUrl(e.target.value)}
          ></input>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-auto h-auto bg-primarylight text-navy"
            // value="Add to Profile"
            // target="_self"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default ProfileCreation;
