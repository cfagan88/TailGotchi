import { useEffect, useState } from "react";
import { UserProfile } from "../api/global.types";
import { supaClient } from "../api/client";

const OwnerEdit = () => {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [ownerData, setOwnerData] = useState<null | UserProfile[]>(null);

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
        setFetchError("Could not fetch pet data");
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

  const handleEditProfile = async () => {
    const {
        data: { user },
      } = await supaClient.auth.getUser();
      if (!user) {
        return;
      }
    
              const { data, error } = await supaClient
                .from("users_profiles")
                .update({username: '', 
                    name: '',
                    avatar_url: ''
                })
                .eq("user_id", user.id);
        
                if (error) {
                    setFetchError("Could not fetch pet data");
                    setOwnerData(null);
                    console.log(error);
                  }
            
                  if (data) {
                    setOwnerData(data);
                    setFetchError(null);
                  }

  }
  

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {ownerData && (
        <form className="border-2 border-mediumblue bg-lightblue rounded-lg min-w-[20%] max-w-[40%] max-h-[40%] min-h-[20%] shadow-md shadow-lightblue">
          <input type="text" defaultValue={ownerData[0]?.username} />
          {ownerData[0]?.name && ownerData[0]?.avatar_url ? (
            <>
              <input type="text" defaultValue={ownerData[0]?.name} />
              <input type="text" defaultValue={ownerData[0]?.avatar_url} />
            </>
          ) : (
            <>
              <input type="text" />
              <input type="text" />
            </>
          )}
          <button onClick={handleEditProfile}></button>
        </form>
      )}
    </>
  );
};

export default OwnerEdit;
