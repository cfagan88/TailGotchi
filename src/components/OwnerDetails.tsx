import { useEffect, useState } from "react";
import { UserProfile } from "../api/global.types";
import { supaClient } from "../api/client";
import OwnerEdit from "./OwnerEdit";

const OwnerDetails = () => {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [ownerData, setOwnerData] = useState<null | UserProfile[]>(null);
  const [editState, setEditState] = useState<boolean>(false);

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
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {ownerData && (
        <>
          {!editState ? (
            <article className="border-2 border-mediumblue bg-lightblue rounded-lg min-w-[20%] max-w-[40%] max-h-[40%] min-h-[20%] shadow-md shadow-lightblue">
              <p className="text-navy">Owner name: {ownerData[0].name}</p>
              <p className="text-navy">Username: {ownerData[0].username}</p>
              {!ownerData[0].avatar_url ? (
                <p>No profile image</p>
              ) : (
                <img src={ownerData[0].avatar_url}></img>
              )}
              <button onClick={() => setEditState(true)}>Edit profile</button>
            </article>
          ) : (
            <section className="border-2 border-mediumblue bg-lightblue rounded-lg min-w-[20%] max-w-[40%] max-h-[40%] min-h-[20%] shadow-md shadow-lightblue">
              <h2 className="text-navy">Edit Profile</h2>
              <OwnerEdit />
              <button onClick={() => setEditState(false)}>Cancel</button>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default OwnerDetails;
