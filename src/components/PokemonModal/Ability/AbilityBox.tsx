import { Ability } from "../../../types";
import AbilityBadge from "./AbilityBadge";
import { useUIStore } from "@/stores/uiStore";

type AbilityBoxProps = {
  abilities: [Ability, boolean][];
};

export default function AbilityBox({ abilities }: AbilityBoxProps) {
  const setSelectedAbility = useUIStore(state => state.setSelectedAbility);
  const regularAbilities = abilities.slice(0, 2);
  const hiddenAbility = abilities[2];

  return (
    <div>
      <div className="relative flex w-full rounded-lg text-center">
        <div className="flex flex-wrap gap-3 w-full justify-evenly">
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
            onClick={() => setSelectedAbility(hiddenAbility[0])}
            isHidden={true}
            isAvailable={hiddenAbility[1]}
          />
        </div>
      </div>
    </div>
  );
}
