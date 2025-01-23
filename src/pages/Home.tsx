import HomepageUserInfo from "../components/HomepageUserInfo";
import TaskSummary from "../components/TaskSummary";
import { supaClient } from "../api/client";
import { useState, useEffect } from "react";

const Home = () => {
  const [username, setUsername] = useState<string>("");

  const getUserInfo = async () => {
    try {
      const {
        data: { user },
      } = await supaClient.auth.getUser();

      if (user) {
        const { data } = await supaClient
          .from("users_profiles")
          .select("*")
          .eq("user_id", user.id);

        if (data) {
          setUsername(data[0].username);
        }
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="home-page flex flex-col justify-center p-8">
      <h1 className="my-10 text-left text-3xl text-navy font-bold">
        {`Good to see you again, ${username}!`}
      </h1>
      <HomepageUserInfo />
      <div className="bg-navy p-6 my-10 rounded-xl">
        <h2 className="text-2xl font-bold mt-3 mb-5 text-white">
          Your Current Tasks:
        </h2>
        <TaskSummary isHomepage={true} />
      </div>
    </div>
  );
};

export default Home;
