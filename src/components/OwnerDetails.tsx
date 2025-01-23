import { useEffect, useState } from "react";
import { UserProfile } from "../api/global.types";
import { supaClient } from "../api/client";
import OwnerEdit from "./OwnerEdit";
import { CiEdit } from "react-icons/ci";
import characterOne from "../assets/animations and images/female-one.png";
import characterTwo from "../assets/animations and images/female-two.png";
import characterThree from "../assets/animations and images/female-three.png";
import characterFour from "../assets/animations and images/male-one.png";
import characterFive from "../assets/animations and images/male-two.png";
import characterSix from "../assets/animations and images/male-three.png";
import getAvatarImage from "../utils/getAvatarImage";
import Lottie from "lottie-react";
import Loading from "../assets/animations and images/Loading.json";

const OwnerDetails = () => {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [ownerData, setOwnerData] = useState<null | UserProfile[]>(null);
  const [editState, setEditState] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>();

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

    if(ownerData){
      getAvatarImage(
        ownerData[0].avatar_url,
        setAvatarUrl,
        characterOne,
        characterTwo,
        characterThree,
        characterFour,
        characterFive,
        characterSix
      );
    }
    
    fetchProfile();
  }, [editState, ownerData]);
  
  console.log(ownerData)

  return (
    <>
      {fetchError && <p className="text-red-500 text-center">{fetchError}</p>}
      {ownerData && (
        <>
          {!editState ? (
            <article className="bg-white bg-opacity-90 rounded-lg max-w-full shadow-md border-navy border-2 border-opacity-20 my-10 relative p-4 sm:p-6 lg:p-8">
              <p className="text-navy text-xl font-semibold mb-4">
                Personal info
              </p>
              {!avatarUrl ? <Lottie
              animationData={Loading}
              className="loading-animation size-24"
            /> : (
                <img
                  src={avatarUrl}
                  className="w-24 h-24 bg-navy max-w-full rounded-lg my-4"
                  alt="Owner Avatar"
                />
              )}
              <p className="text-navy text-base sm:text-lg">
                <span className="font-bold">Name:</span> {ownerData[0].name}
              </p>
              <p className="text-navy text-base sm:text-lg">
                <span className="font-bold">Username:</span>{" "}
                {ownerData[0].username}
              </p>
              <button
                className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-xl text-navy py-2 px-4 shadow-xl flex items-center space-x-2 "
                onClick={() => setEditState(true)}
              >
                <CiEdit className="text-xl" />
                <span className="text-sm sm:text-base">Edit</span>
              </button>
            </article>
          ) : (
            <section className="bg-primarylight rounded-lg max-w-full sm:max-w-[60%] md:max-w-full lg:max-w-full mx-auto  p-4 my-10">
              <h2 className="text-navy text-2xl font-semibold mb-4 text-center">
                Edit Profile
              </h2>
              <OwnerEdit setEditState={setEditState} />
              <button
                className="mt-4 bg-mediumblue  text-white font-bold py-2 px-4 rounded-xl hover:bg-lightblue hover:border-mediumblue mx-auto block"
                onClick={() => setEditState(false)}
              >
                Cancel
              </button>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default OwnerDetails;
