import { useEffect, useState } from "react";
import { supaClient } from "../api/client";
import { Navigate } from "react-router-dom";
const UserExists = () => {
  const [profileExists, setProfileExists] = useState<boolean>(false);
  const [hiddenLoading, setHiddenLoading] = useState<boolean>(true);
  useEffect(() => {
    const testFn = async () => {
      setHiddenLoading(true);
      const {
        data: { user },
      } = await supaClient.auth.getUser();
      if (user) {
        const { data } = await supaClient
          .from("users_profiles")
          .select("*, users!inner(*)")
          .eq("users.id", user.id);
        if (data && data.length) {
          setProfileExists(true);
          setHiddenLoading(false);
        } else {
          setProfileExists(false);
          setHiddenLoading(false);
        }
      }
    };
    testFn();
  }, []);
  if (!hiddenLoading) {
    if (profileExists) {
      return <Navigate to="home" />;
    } else {
      return <Navigate to="profile-creation" />;
    }
  }
};
export default UserExists;
