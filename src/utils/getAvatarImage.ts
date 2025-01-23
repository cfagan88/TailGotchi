const getAvatarImage = (
  userAvatarUrl: string|null,
  setAvatarUrl: Function,
  characterOne: string,
  characterTwo: string,
  characterThree: string,
  characterFour: string,
  characterFive: string,
  characterSix: string
) => {
  if (userAvatarUrl) {
      if (userAvatarUrl.includes("female")) {
        if (userAvatarUrl.includes("one")) {
          setAvatarUrl(characterOne);
        } else if (userAvatarUrl.includes("two")) {
          setAvatarUrl(characterTwo);
        } else if (userAvatarUrl.includes("three")) {
          setAvatarUrl(characterThree);
        }
      }else if (userAvatarUrl.includes("male")) {
      if (userAvatarUrl.includes("one")) {
        setAvatarUrl(characterFour);
      } else if (userAvatarUrl.includes("two")) {
        setAvatarUrl(characterFive);
      } else if (userAvatarUrl.includes("three")) {
        setAvatarUrl(characterSix);
      }
    } 
  }
};

export default getAvatarImage;
