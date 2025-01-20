import { useEffect, useState } from "react";
import { UserProfile } from "../api/global.types";
import { supaClient } from "../api/client";

const OwnerEdit = () => {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [ownerData, setOwnerData] = useState<null | UserProfile[]>(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supaClient.auth.getUser();
      if (!user) {
        return;
      }
      const { data, error } = await supaClient
        .from("users_profiles")
        .select()
        .eq("user_id", user.id);
      if (error) {
        setFetchError("Could not fetch profile data");
        setOwnerData(null);
        console.log(error);
      }
      if (data) {
        setOwnerData(data);
        setFetchError(null);
        setUsername(data[0]?.username || "");
        setName(data[0]?.name || "");
        setAvatarUrl(data[0]?.avatar_url || "");
      }
    };
    fetchProfile();
  }, []);

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supaClient.auth.getUser();
    if (!user) {
      return;
    }

    const { data, error } = await supaClient
      .from("users_profiles")
      .update({ username, name, avatar_url: avatarUrl })
      .eq("user_id", user.id)
      .select();

    if (error) {
      setFetchError("Error trying to edit profile");
      setOwnerData(null);
      console.log(error);
    }

    if (data) {
      setOwnerData(data);
      setFetchError(null);
    }
  };

  return (
    <>
      {fetchError && <p className="text-red-500 text-center">{fetchError}</p>}
      {ownerData && (
        <form
          onSubmit={handleEditProfile}
          className="bg-white flex flex-col justify-center rounded-lg p-6 border-2 border-navy border-opacity-20 shadow-xl max-w-full sm:max-w-md md:max-w-lg mx-auto my-4"
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-navy font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="text-navy w-full p-2 rounded-lg border border-navy"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-navy font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="text-navy w-full p-2 rounded-lg border border-navy"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="avatarUrl"
              className="block text-navy font-semibold mb-2"
            >
              Avatar URL
            </label>
            <input
              type="text"
              id="avatarUrl"
              className="text-navy w-full p-2 rounded-lg border border-navy"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-mediumblue text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-lightblue transition-colors"
          >
            Save changes
          </button>
        </form>
      )}
    </>
  );
};

export default OwnerEdit;
