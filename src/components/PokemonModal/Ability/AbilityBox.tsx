import { useState } from "react";
import { Ability } from "../../../types";
import AbilityDescription from "./AbilityDescription";
import AbilityBadge from "./AbilityBadge";
import BoxLabel from "@/components/BoxLabel";

type AbilityBoxProps = {
  abilities: [Ability, boolean][];
};

export default function AbilityBox({ abilities }: AbilityBoxProps) {
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);
  const regularAbilities = abilities.slice(0, 2);
  const hiddenAbility = abilities[2];

  return (
    <div>
      <div className="neutral-box relative flex w-full rounded-sm py-7 text-center ">
        <BoxLabel label="Abilities"/>
        <div className="flex flex-wrap gap-2 pl-5 w-full justify-evenly">
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
      <div className=" mt-2">
        <AbilityDescription
          selectedAbility={selectedAbility}
          onClose={() => setSelectedAbility(null)}
        />
      </div>
    </div>
  );
}
