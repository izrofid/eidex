import React from "react";
import { Ability } from "../../types" 
import { getAbilityName } from "../../utils/abilityData";

type AbilityBadgeProps = {
    ability: Ability;
    onClick: (ability: Ability) => void;
    isHidden?: boolean;
};

const AbilityBadge: React.FC<AbilityBadgeProps> = ({
    ability,
    onClick,
    isHidden = false,
  }) => {
    if (ability[0] === 0) return null; // Skip invalid abilities
  
    return (
      <div
        className={`ability_badge cursor-pointer ${
          isHidden ? "bg-pink-700 font-bold" : ""
        }`}
        onClick={() => onClick(ability)}
      >
        {getAbilityName(ability as [number, number])}
      </div>
    );
  };

export default AbilityBadge;