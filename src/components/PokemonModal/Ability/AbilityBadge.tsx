import React from "react";
import { Ability } from "../../../types";
import { getAbilityNameShort } from "../../../utils/abilityData";

type AbilityBadgeProps = {
  ability: Ability;
  onClick: (ability: Ability) => void;
  isHidden?: boolean;
  isAvailable?: boolean;
};

const AbilityBadge: React.FC<AbilityBadgeProps> = ({
  ability,
  onClick,
  isHidden = false,
  isAvailable = true,
}) => {
  if (ability == 0) return null; // Skip invalid abilities

  return (
    <div
      className={`-skew-x-18 w-28 select-none items-center text-nowrap py-0.5 pl-1 text-left text-xs text-white transition-colors sm:text-sm cursor-pointer ring-1 ${
        isHidden
          ? "bg-pink-600 transition-colors hover:bg-pink-700 active:bg-pink-800"
          : " hover:bg-slate-700 active:bg-slate-800  bg-slate-600"
      } ${isAvailable ? "" : "line-through decoration-1"}`}
      onClick={() => onClick(ability)}
    >
      <div className=" pl-1 skew-x-18">{getAbilityNameShort(ability)}</div>
    </div>
  );
};

export default AbilityBadge;
