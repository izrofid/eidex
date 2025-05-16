import { useState } from "react";
import { Ability } from "../../types";
import AbilityDescription from "./AbilityDescription";
import AbilityBadge from "./AbilityBadge";

type AbilityBoxProps = {
  abilities: Ability[];
};

export default function AbilityBox({ abilities }: AbilityBoxProps) {
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);
  //If the first ability is repeated, replace repeats with 0
  abilities.forEach((ability, index) => {
    if (abilities.indexOf(ability) !== index) {
      abilities[index] = 0;
    }
  });
  const regularAbilities = abilities.slice(0, 2);
  const hiddenAbility = abilities[2];

  return (
    <div>
      <div className="neutral-box relative flex w-full justify-evenly rounded-sm px-1 py-7 text-center">
        <div className="w-19 font-pkmnem-short absolute left-6 top-0 flex translate-y-[-50%] select-none items-center justify-center rounded border border-gray-300 bg-blue-900 px-4 py-1 text-center text-xs font-bold uppercase text-gray-100">
          Abilities
        </div>
        <div className="flex flex-wrap gap-2 justify-evenly">
          {regularAbilities.map((ability) => (
            <AbilityBadge
              key={ability}
              ability={ability}
              onClick={() => setSelectedAbility(ability)}
            />
          ))}
          <AbilityBadge
            ability={hiddenAbility}
            onClick={() => setSelectedAbility(abilities[2])}
            isHidden
          />
        </div>
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
