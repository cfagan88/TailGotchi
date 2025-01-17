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
      {fetchError && <p>{fetchError}</p>}
      {ownerData && (
        <form
          onSubmit={handleEditProfile}
          className="border-2 border-mediumblue bg-lightblue flex flex-col justify-center rounded-lg min-w-[20%] max-w-[40%] max-h-[40%] min-h-[20%] shadow-md shadow-lightblue"
        >
          <input
            type="text"
            className="bg-mediumblue text-navy"
            //defaultValue={ownerData[0]?.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {ownerData[0]?.name && ownerData[0]?.avatar_url ? (
            <>
              <input
                type="text"
                className="bg-mediumblue text-navy"
                //defaultValue={ownerData[0]?.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="bg-mediumblue text-navy"
                //defaultValue={ownerData[0]?.avatar_url}
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                className="bg-mediumblue text-navy"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="bg-mediumblue text-navy"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </>
          )}
          <button type="submit" className="bg-lightblue text-navy">
            Save
          </button>
        </form>
      )}
    </>
  );
};

export default OwnerEdit;
