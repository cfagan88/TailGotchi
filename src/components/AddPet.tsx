import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { supaClient } from "../api/client";
import dogNodding from "../assets/animations and images/dog-nodding.gif";
import bouncingFullHeart from "../assets/animations and images/bouncing-full-heart.gif";
import bouncingEmptyHeart from "../assets/animations and images/bouncing-grey-heart.gif";
import bouncingStar from "../assets/animations and images/bouncing-star.gif";

const AddPet = () => {
  const [petName, setPetName] = useState<string>("");
  const [petAge, setPetAge] = useState<number | null>(null);
  const [breed, setBreed] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [likes, setLikes] = useState<string | null>(null);
  const [dislikes, setDislikes] = useState<string | null>(null);
  const [petCareInfo, setPetCareInfo] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supaClient.auth.getUser();

    if (!user) {
      return;
    }

    if (!petName) {
      setFormError("Please fill in all required fields");
      return;
    }

    try {
      const { data } = await supaClient
        .from("pets")
        .insert([
          {
            pet_name: petName,
            pet_age: petAge,
            breed: breed,
            gender: gender,
            pet_likes: likes,
            pet_dislikes: dislikes,
            pet_care_info: petCareInfo,
          },
        ])
        .select();

      if (data) {
        console.log(data);
        setFormError(null);
        // navigate("/"); go to pet profile page once created

        await supaClient
          .from("users_pets")
          .insert([
            {
              user_id: user.id,
              pet_id: data[0].pet_id,
            },
          ])
          .select();
      }
    } catch (error) {
      setFormError("Error in adding pet");
      console.log(error);
    }
  };

  return (
    <div className="p-8 text-navy rounded-xl my-4 bg-primarylight max-w-4xl mx-auto">
      <div className="flex mb-2">
        <h2 className="text-h2 font-jersey25">Add your pet's information</h2>
        <img
          className="w-10 h-10 mt-1"
          src={dogNodding}
          alt="standard tailgotchi"
        />
      </div>
      <p className="mb-6">
        Please fill out the form below with your pet's details and any special
        care information you'd like to share.
      </p>

      <form className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="pet-name" className="font-jersey25 text-h3">
              Name
            </label>
            <input
              type="text"
              id="pet-name"
              required
              className="w-full p-2 mt-1 border border-mediumblue rounded"
              placeholder="What is your pet's name?"
              onChange={(e) => setPetName(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="pet-age" className="font-jersey25 text-h3">
              Age
            </label>
            <input
              type="number"
              id="pet-age"
              min={0}
              max={25}
              className="w-full p-2 mt-1 border border-mediumblue rounded"
              placeholder="How old is your pet?"
              onChange={(e) => setPetAge(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="pet-breed" className="font-jersey25 text-h3">
              Breed
            </label>
            <input
              type="text"
              id="pet-breed"
              className="w-full p-2 mt-1 border border-mediumblue rounded"
              placeholder="What breed is your pet?"
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="pet-gender" className="font-jersey25 text-h3">
              Gender
            </label>
            <input
              type="text"
              id="pet-gender"
              className="w-full p-2 mt-1 border border-mediumblue rounded"
              placeholder="What is your pet's gender?"
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-1 mb-4">
          <label htmlFor="pet-likes" className="font-jersey25 text-h3">
            Likes
          </label>
          <img
            className="w-5 h-5"
            src={bouncingFullHeart}
            alt="bouncing star animation"
          />
        </div>
        <textarea
          id="pet-likes"
          className="w-full p-2 mt-1 border border-mediumblue rounded"
          placeholder="What activities or toys does your pet enjoy?"
          onChange={(e) => setLikes(e.target.value)}
        />

        <div className="flex items-center space-x-1 mb-4">
          <label htmlFor="pet-dislikes" className="font-jersey25 text-h3">
            Dislikes
          </label>
          <img
            className="w-5 h-5"
            src={bouncingEmptyHeart}
            alt="bouncing star animation"
          />
        </div>
        <textarea
          id="pet-dislikes"
          className="w-full p-2 mt-1 border border-mediumblue rounded"
          placeholder="Is there anything your pet dislikes?"
          onChange={(e) => setDislikes(e.target.value)}
        />

        <div className="flex items-center space-x-1 mb-4">
          <label htmlFor="pet-care" className="font-jersey25 text-h3">
            Special care information
          </label>
          <img
            className="w-5 h-5"
            src={bouncingStar}
            alt="bouncing star animation"
          />
        </div>
        <textarea
          id="pet-care"
          className="w-full p-2 mt-1 border border-mediumblue rounded"
          placeholder="Does your pet require any special care or attention?"
          onChange={(e) => setPetCareInfo(e.target.value)}
        />

        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-lightblue px-20 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue"
          >
            Add Pet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPet;
