import { useEffect, useState } from "react";
import { supaClient } from "../api/client";

const HomepageUserInfo = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>();
  const [username,setUsername]=useState<string>("")
  const [scoreData, setScoreData] = useState<number>(0);

  const getUserInfo = async () => {
    const {
      data: { user },
    } = await supaClient.auth.getUser();
    if (user) {
      const { data } = await supaClient
        .from("users_profiles")
        .select("*")
        .eq("user_id", user.id);
      if (data) {
        setAvatarUrl(data[0].avatar_url);
        setUsername(data[0].username)
      }
      const scoreData = await supaClient
        .from("users_pets")
        .select("task_points")
        .eq("user_id", user.id);
      const extractedPoint = scoreData.data?.map((petScore) => {
        return petScore.task_points;
      });
      const totalPoints=extractedPoint?.reduce((acc,curVal)=>acc+curVal,0)
      if(totalPoints){
          setScoreData(totalPoints)
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    supaClient
      .channel("users_pets")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users_pets",
        },
        (_payload) => {
          getUserInfo();
        }
      )
      .subscribe()
  }, []);

  return (
    <>
      <div className="justify-between">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            className="w-40 h-40 bg-navy max-w-full rounded-lg my-4"
            alt="Owner Avatar"
          />
        ) : (
          <p>No Profile Image</p>
        )}
        <p className="text-navy">{username}</p>
        <p className="text-navy content-center">Score: {scoreData}</p>
      </div>
    </>
  );
};

export default HomepageUserInfo;
