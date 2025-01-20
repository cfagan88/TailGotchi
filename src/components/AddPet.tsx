import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const [formError, setFormError] = useState({
    petName: null as string | null,
    breed: null as string | null,
    gender: null as string | null,
    likes: null as string | null,
    dislikes: null as string | null,
    petCareInfo: null as string | null,
    message: null as string | null,
  });

  const navigate = useNavigate();

  const inputRegex = /^[\p{L}\p{M}'-.!]+(?: [\p{L}\p{M}'-.!]+)*$/u;

  const validateInput = (value: string, isRequired: boolean = false) => {
    if (isRequired && value.trim() === "") {
      return "This field is required.";
    } else if (value.trim() !== "" && !inputRegex.test(value)) {
      return "Please use only letters, spaces, and standard punctuation.";
    }
    return null;
  };

  const handleBlur = (
    field:
      | "petName"
      | "breed"
      | "gender"
      | "likes"
      | "dislikes"
      | "petCareInfo",
    value: string,
    isRequired: boolean = false
  ) => {
    const error = validateInput(value, isRequired);
    setFormError((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateInput(petName, true);
    const breedError = validateInput(breed || "", false);
    const genderError = validateInput(gender || "", false);
    const likesError = validateInput(likes || "", false);
    const dislikesError = validateInput(dislikes || "", false);
    const petCareInfoError = validateInput(petCareInfo || "", false);

    if (
      nameError ||
      breedError ||
      genderError ||
      likesError ||
      dislikesError ||
      petCareInfoError
    ) {
      setFormError({
        petName: nameError,
        breed: breedError,
        gender: genderError,
        likes: likesError,
        dislikes: dislikesError,
        petCareInfo: petCareInfoError,
        message: "Please correct the errors above before submitting.",
      });
      return;
    }

    setFormError({
      petName: null,
      breed: null,
      gender: null,
      likes: null,
      dislikes: null,
      petCareInfo: null,
      message: null,
    });

    const {
      data: { user },
    } = await supaClient.auth.getUser();
    if (!user) {
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
        await supaClient.from("users_pets").insert([
          {
            user_id: user.id,
            pet_id: data[0].pet_id,
          },
        ]);

        setPetName("");
        setPetAge(null);
        setBreed(null);
        setGender(null);
        setLikes(null);
        setDislikes(null);
        setPetCareInfo(null);

        navigate("/my-pets");
      }
    } catch (error) {
      setFormError({
        ...formError,
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="p-8 text-navy rounded-xl my-4 bg-primarylight max-w-4xl mx-auto">
      <div className="flex mb-2">
        <h2 className="text-2xl font-bold content-center">
          Add your pet's information
        </h2>
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

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="pet-name" className=" text-2xl font-bold">
              Name
            </label>
            <input
              type="text"
              id="pet-name"
              minLength={2}
              maxLength={20}
              required
              className={`w-full p-2 mt-1 border ${
                formError.petName ? "border-red-500" : "border-mediumblue"
              } rounded`}
              placeholder="What is your pet's name?"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              onBlur={() => handleBlur("petName", petName, true)}
            />
            {formError.petName && (
              <p className="text-red-500 text-sm mt-3">{formError.petName}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="pet-age" className="text-2xl font-bold">
              Age
            </label>
            <input
              type="number"
              id="pet-age"
              min={0}
              max={25}
              className="w-full p-2 mt-1 border border-mediumblue rounded"
              placeholder="How old is your pet?"
              value={petAge || ""}
              onChange={(e) => setPetAge(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="pet-breed" className="text-2xl font-bold">
              Breed
            </label>
            <input
              type="text"
              id="pet-breed"
              maxLength={50}
              className={`w-full p-2 mt-1 border ${
                formError.breed ? "border-red-500" : "border-mediumblue"
              } rounded`}
              placeholder="What breed is your pet?"
              value={breed || ""}
              onChange={(e) => setBreed(e.target.value)}
              onBlur={() => handleBlur("breed", breed || "", false)}
            />
            {formError.breed && (
              <p className="text-red-500 text-sm mt-3">{formError.breed}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="pet-gender" className="text-2xl font-bold">
              Gender
            </label>
            <input
              type="text"
              id="pet-gender"
              maxLength={20}
              className={`w-full p-2 mt-1 border ${
                formError.gender ? "border-red-500" : "border-mediumblue"
              } rounded`}
              placeholder="What is your pet's gender?"
              value={gender || ""}
              onChange={(e) => setGender(e.target.value)}
              onBlur={() => handleBlur("gender", gender || "", false)}
            />
            {formError.gender && (
              <p className="text-red-500 text-sm mt-3">{formError.gender}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1 mb-4">
          <label htmlFor="pet-likes" className="text-2xl font-bold">
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
          maxLength={250}
          className={`w-full p-2 mt-1 border ${
            formError.likes ? "border-red-500" : "border-mediumblue"
          } rounded`}
          placeholder="What activities or toys does your pet enjoy?"
          value={likes || ""}
          onChange={(e) => setLikes(e.target.value)}
          onBlur={() => handleBlur("likes", likes || "", false)}
        />{" "}
        {formError.likes && (
          <p className="text-red-500 text-sm mt-3">{formError.likes}</p>
        )}
        <div className="flex items-center space-x-1 mb-4">
          <label htmlFor="pet-dislikes" className="text-2xl font-bold">
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
          maxLength={250}
          className={`w-full p-2 mt-1 border ${
            formError.dislikes ? "border-red-500" : "border-mediumblue"
          } rounded`}
          placeholder="Is there anything your pet dislikes?"
          value={dislikes || ""}
          onChange={(e) => setDislikes(e.target.value)}
          onBlur={() => handleBlur("dislikes", dislikes || "", false)}
        />{" "}
        {formError.dislikes && (
          <p className="text-red-500 text-sm mt-3">{formError.dislikes}</p>
        )}
        <div className="flex items-center space-x-1 mb-4">
          <label htmlFor="pet-care" className="text-2xl font-bold">
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
          maxLength={500}
          className={`w-full p-2 mt-1 border ${
            formError.petCareInfo ? "border-red-500" : "border-mediumblue"
          } rounded`}
          placeholder="Does your pet require any special care or attention?"
          value={petCareInfo || ""}
          onChange={(e) => setPetCareInfo(e.target.value)}
          onBlur={() => handleBlur("petCareInfo", petCareInfo || "", false)}
        />{" "}
        {formError.petCareInfo && (
          <p className="text-red-500 text-sm mt-3">{formError.petCareInfo}</p>
        )}
        {formError.message && (
          <p className="text-red-500 text-sm font-black text-center">
            {formError.message}
          </p>
        )}
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
