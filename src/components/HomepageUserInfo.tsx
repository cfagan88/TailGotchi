import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import Lottie from "lottie-react";
import Loading from "../assets/animations and images/Loading.json";
import fullHeartBar from "../assets/animations and images/full-heartbar.png";
import characterOne from "../assets/animations and images/female-one.png";
import characterTwo from "../assets/animations and images/female-two.png";
import characterThree from "../assets/animations and images/female-three.png";
import characterFour from "../assets/animations and images/male-one.png";
import characterFive from "../assets/animations and images/male-two.png";
import characterSix from "../assets/animations and images/male-three.png";
import getAvatarImage from "../utils/getAvatarImage";

const HomepageUserInfo = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>();
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
        getAvatarImage(
          data[0].avatar_url,
          setAvatarUrl,
          characterOne,
          characterTwo,
          characterThree,
          characterFour,
          characterFive,
          characterSix
        );
      }
      const scoreData = await supaClient
        .from("users_pets")
        .select("task_points")
        .eq("user_id", user.id);
      const extractedPoint = scoreData.data?.map((petScore) => {
        return petScore.task_points;
      });
      const totalPoints = extractedPoint?.reduce(
        (acc, curVal) => acc + curVal,
        0
      );
      if (totalPoints) {
        setScoreData(totalPoints);
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
      .subscribe();
  }, []);

  const scoreClass =
    scoreData < 0
      ? "text-red-500"
      : scoreData >= 1
      ? "text-green-500"
      : "text-white";
  return (
    <div className="bg-navy  text-white rounded-xl content-center p-6">
      <div className="flex gap-8 w-full justify-between space-x-4">
        <div className="w-56 flex flex-col justify-center items-center">
          {avatarUrl ? (
            <img
              src={`__dirname/..${avatarUrl}`}
              className="w-40 h-40 bg-lightblue rounded-xl mb-2"
              alt="Owner Avatar"
            />
          ) : (
            <Lottie
              animationData={Loading}
              className="loading-animation size-24"
            />
          )}
        </div>
        <div className="w-full text-left">
          <div className="flex items-center justify-start h-11 gap-4 mb-6">
            <h3 className="text-2xl font-bold mt-3 mb-5">Player Overview</h3>
            <img className="w-20 h-20 " src={fullHeartBar} alt="heartbar" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <p className="text-text">
              <span className="font-bold">Your current score:</span>{" "}
              <span className={`${scoreClass} font-bold`}>{scoreData}</span>
            </p>
            <p>
              <span className="font-bold">Total tasks completed:</span> 10 tasks
            </p>
            <p>
              <span className="font-bold">Best day:</span> Monday (20 tasks
              completed)
            </p>
            <p>
              <span className="font-bold">Task completion streak:</span> 10 days
            </p>
            <p>
              <span className="font-bold">Total points earned:</span> 100 points
            </p>
            <p>
              <span className="font-bold">Pet mood:</span> Happy (95%)
            </p>
            <p>
              <span className="font-bold">Total pets:</span> 2 pets
            </p>
            <p>
              <span className="font-bold">Most active pet:</span> Jasper (22
              tasks completed)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageUserInfo;
