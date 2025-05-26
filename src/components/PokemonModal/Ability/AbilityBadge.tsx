import { Ability } from "../../../types";
import { getAbilityNameShort } from "../../../utils/abilityData";
import { Button } from "@headlessui/react";

type AbilityBadgeProps = {
  ability: Ability;
  onClick: (ability: Ability) => void;
  isHidden?: boolean;
  isAvailable?: boolean;
};

const AbilityBadge = ({
  ability,
  onClick,
  isHidden = false,
  isAvailable = true,
}: AbilityBadgeProps) => {
  if (ability == 0) return null; // Skip invalid abilities

  return (
    <Button
      className={`font-chakra group relative flex min-w-[10ch] -skew-x-12 items-center justify-center px-4 py-1 text-xs font-medium tracking-wide text-gray-50 sm:text-sm ${
        isHidden ? "bg-gradient-to-r from-fuchsia-700 to-purple-700" : "bg-gradient-to-r from-cyan-700 to-teal-700"
      } rounded-md shadow-sm transition-all duration-200 ease-in-out ${
        isAvailable
          ? "cursor-pointer"
          : "cursor-not-allowed line-through decoration-1 opacity-60"
      }      overflow-hidden ${
        isAvailable
          ? isHidden
            ? "hover:from-fuchsia-800 hover:to-purple-800 hover:shadow-md active:from-fuchsia-900 active:to-purple-900"
            : "hover:from-cyan-800 hover:to-teal-800 hover:shadow-md active:from-cyan-900 active:to-teal-900"
          : ""
      } `}
      onClick={() => onClick(ability)}
      disabled={!isAvailable}
      aria-label={getAbilityNameShort(ability)}
    >
      <span className="skew-x-12">{getAbilityNameShort(ability)}</span>
    </Button>
  );
};

export default AbilityBadge;
