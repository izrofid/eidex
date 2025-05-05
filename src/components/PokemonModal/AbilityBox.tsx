import { useState } from "react";
import { Ability } from "../../types";
import AbilityDescription from "./AbilityDescription";
import AbilityBadge from "./AbilityBadge";

type AbilityBoxProps = {
  abilities: Ability[];
  hiddenAbility: Ability;
};

export default function AbilityBox({
  abilities,
  hiddenAbility,
}: AbilityBoxProps) {
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);

  return (
    <div>
      <div className="neutral-box relative flex w-full flex-row justify-evenly rounded-sm px-3 py-7 text-center">
        <div className="w-19 font-pkmnem-short absolute left-6 top-0 flex translate-y-[-50%] select-none items-center justify-center rounded border border-gray-300 bg-blue-900 px-4 py-1 text-center text-xs font-bold uppercase text-gray-100">
          Abilities
        </div>
        {abilities.map((ability) => (
          <AbilityBadge
            key={ability[0]}
            ability={ability}
            onClick={() => setSelectedAbility(ability)}
          />
        ))}
        <AbilityBadge
          ability={hiddenAbility}
          onClick={() => setSelectedAbility(hiddenAbility)}
          isHidden
        />
      </div>
      <div className="mt-3">
        <AbilityDescription
          selectedAbility={selectedAbility}
          onClose={() => setSelectedAbility(null)}
        />
      </div>
    </div>
  );
}