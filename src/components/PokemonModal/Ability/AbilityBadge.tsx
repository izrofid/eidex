import React from "react";
import { Ability } from "../../../types";
import { getAbilityNameShort } from "../../../utils/abilityData";
import { Button } from "@headlessui/react";

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
    <Button
      className={`group relative flex min-w-[10ch] items-center justify-center bg-gradient-to-r px-2 py-1 pr-3 text-xs font-medium font-lexend tracking-wide text-white sm:text-sm ${isHidden ? "from-pink-600 to-pink-700" : "from-slate-600 to-slate-700"} rounded-md shadow-md transition-all duration-150 ${isAvailable ? "hover:brightness-110 active:brightness-95 cursor-pointer" : "opacity-60 line-through decoration-1 hover:brightness-110 cursor-help"} skew-x-[-18deg] overflow-hidden`}
      onClick={() => onClick(ability)}
      // Allow clicking for all abilities to view description
      disabled={false}
      aria-label={`${getAbilityNameShort(ability)}${!isAvailable ? ' (unavailable)' : ''}`}
    >
      <span className="skew-x-[18deg]">{getAbilityNameShort(ability)}</span>
    </Button>
  );
};

export default AbilityBadge;
