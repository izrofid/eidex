import React from "react";
import { Ability } from "../../types";
import { getAbilityNameShort } from "../../utils/abilityData";

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
  if (ability == 0) return null; // Skip invalid abilities

  return (
    <div
      className={`ability_badge cursor-pointer ${
        isHidden ? "bg-pink-700" : ""
      }`}
      onClick={() => onClick(ability)}
    >
      {getAbilityNameShort(ability)}
    </div>
  );
};

export default AbilityBadge;
