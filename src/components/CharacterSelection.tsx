import React, { useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import characterOne from "../assets/animations and images/female-one.png";
import characterTwo from "../assets/animations and images/female-two.png";
import characterThree from "../assets/animations and images/female-three.png";
import characterFour from "../assets/animations and images/male-one.png";
import characterFive from "../assets/animations and images/male-two.png";
import characterSix from "../assets/animations and images/male-three.png";

const characters = [
  { id: "female-one", src: characterOne },
  { id: "female-two", src: characterTwo },
  { id: "female-three", src: characterThree },
  { id: "male-one", src: characterFour },
  { id: "male-two", src: characterFive },
  { id: "male-three", src: characterSix },
];

interface CharacterSelectionProps {
  selectedCharacter: string;
  onSelect: (character: string) => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  selectedCharacter,
  onSelect,
}) => {
  const [currentGroup, setCurrentGroup] = useState(0);

  const handleCharacterChange = (direction: "left" | "right") => {
    const newGroup = direction === "left" ? currentGroup - 1 : currentGroup + 1;
    if (newGroup < 0) {
      setCurrentGroup(1);
    } else if (newGroup > 1) {
      setCurrentGroup(0);
    } else {
      setCurrentGroup(newGroup);
    }
  };

  const orderedCharacters = [
    characters[0],
    characters[3],
    characters[1],
    characters[4],
    characters[2],
    characters[5],
  ];

  const currentCharacters = orderedCharacters.slice(
    currentGroup * 3,
    (currentGroup + 1) * 3
  );

  return (
    <div className="flex items-center justify-center space-x-6 md:space-x-3">
      <FaCaretLeft
        className="cursor-pointer text-lightblue w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16"
        onClick={() => handleCharacterChange("left")}
      />
      <div className="flex space-x-6 my-10 md:space-x-3 overflow-x-auto md:w-full justify-center">
        {currentCharacters.map((character) => (
          <div
            key={character.id}
            className={`cursor-pointer rounded-full ${
              character.src === selectedCharacter
                ? "border-2 border-lightblue"
                : ""
            }`}
          >
            <img
              src={character.src}
              alt={character.id}
              className="w-18 h-18 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full"
              onClick={() => onSelect(character.src)}
            />
          </div>
        ))}
      </div>
      <FaCaretRight
        className="cursor-pointer text-lightblue w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
        onClick={() => handleCharacterChange("right")}
      />
    </div>
  );
};

export default CharacterSelection;
