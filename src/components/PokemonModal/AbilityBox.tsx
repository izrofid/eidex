import { useState } from "react";
import { Ability } from "../../types";
import AbilityDescription from "./AbilityDescription";
import AbilityBadge from "./AbilityBadge";

type AbilityBoxProps = {
  abilities: [Ability, boolean][];
};

export default function AbilityBox({ abilities }: AbilityBoxProps) {
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);
  const regularAbilities = abilities.slice(0, 2);
  const hiddenAbility = abilities[2];

  return (
    <div>
      <div className="neutral-box relative flex w-full justify-evenly rounded-sm px-1 py-7 text-center">
        <div className="w-19 font-pixel absolute left-6 top-0 flex translate-y-[-50%] select-none items-center justify-center rounded border border-gray-300 bg-blue-900 px-4 py-1 text-center text-xs font-bold uppercase text-gray-100">
          Abilities
        </div>
        <div className="flex flex-wrap gap-2 justify-evenly">
          {regularAbilities.map((ability, idx) => (
            <AbilityBadge
              key={idx}
              ability={ability[0]}
              onClick={() => setSelectedAbility(ability[0])}
              isAvailable={ability[1]}
            />
          ))}
          <AbilityBadge
            ability={hiddenAbility[0]}
            onClick={() => setSelectedAbility(abilities[2][0])}
            isHidden={true}
            isAvailable={hiddenAbility[1]}
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
