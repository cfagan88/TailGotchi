import { useState } from "react";
import { supaClient } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const navigate = useNavigate();
    const {
      data: { user },
    } = await supaClient.auth.getUser();

    console.log(user);

    if (!user) {
      // Do something
      return;
    }

    try {
      const { data } = await supaClient.from("users_profiles").insert([
        {
          user_id: user.id,
          username: username,
          name: name,
          avatar_url: avatarUrl,
        },
      ]);

      if (data) {
        navigate("/home");
        console.log(data);
      }
    } catch (error) {
      // Do something
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username (required)
        <input
          type="text"
          minLength={6}
          maxLength={30}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Name (optional)
        <input
          type="text"
          maxLength={70}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Avatar URL (optional)
        <input
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </label>
      <button type="submit">Create Profile</button>
    </form>
  );
}
