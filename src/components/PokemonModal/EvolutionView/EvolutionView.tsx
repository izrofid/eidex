import { EvolutionFamily } from "../../../utils/evoFamily";
import { FaArrowRight } from "react-icons/fa";

import Evolution from "./Evolution";
import { Pokemon } from "../../../types";
import React from "react";
import { getSpeciesData } from "@/utils/speciesUtils";
import EvolutionDetails from "./EvolutionDetails";
import { useUIStore } from "@/stores/uiStore";

// This is a derivative type that sets 'evolutions' to not-undefined.
// This component wont render if 'evolutions' is undefined anyways...

interface EvolutionViewProps {
  family: EvolutionFamily;
  pokemon: Pokemon;
}

const EvolutionView: React.FC<EvolutionViewProps> = ({ family }) => {
  const setSelectedPokemon = useUIStore((state) => state.setSelectedPokemon);
  const setSelectedAbility = useUIStore((state) => state.setSelectedAbility);
  const selectedPokemon = useUIStore((state) => state.selectedPokemon);

  const handleSelectPokemon = (pokemonId: number) => {
    const newPokemon = getSpeciesData(pokemonId);

    // Reset ability when changing to a different Pokémon
    if (selectedPokemon && pokemonId !== (selectedPokemon.speciesId ?? 0)) {
      setSelectedAbility(null);
    }

    setSelectedPokemon(newPokemon);
  };
  // Group members by stage
  const stages: Record<number, typeof family.members> = {};
  family.members.forEach((member) => {
    if (stages[member.stage] === undefined) {
      stages[member.stage] = [];
    }
    stages[member.stage].push(member);
  });

  const sortedStages: number[] = Object.keys(stages)
    .map(Number) // parseInt wont work :S
    .sort((a, b) => a - b);

  // Build the columns and arrows in a flat array
  const columnsWithArrows: React.ReactNode[] = sortedStages.map(
    (stage, idx) => {
      return (
        <React.Fragment key={stage}>
          <div
            key={stage}
            className="flex cursor-pointer flex-col items-center gap-1"
          >
            {stages[stage].map((member) => {
              return (
                <span
                  className="font-pixel"
                  key={`${member.id}-${member.requirements || "default"}`}
                >
                  <Evolution
                    pokemon={getSpeciesData(member.id)}
                    onClick={() => handleSelectPokemon(member.id)}
                    requirements={member.requirements}
                    details={member.details}
                  />
                </span>
              );
            })}
          </div>
          {idx < sortedStages.length - 1 && (
            <FaArrowRight key={`arrow-${stage}`} className="mx-2 text-2xl" />
          )}
        </React.Fragment>
      );
    },
  );

  return (
    <div className="flex flex-col gap-3 rounded-md p-2 py-2">
      <div className="flex items-center justify-evenly text-white py-2">
        {family.members.length > 1 ? columnsWithArrows : <span className="flex text-gray-300/50">No Evolutions</span>}
      </div>
      {family.members.length > 1 && (
        <div className="mx-3 flex items-center justify-center">
          <EvolutionDetails evoFamily={family} />
        </div>
      )}
    </div>
  );
};

export default EvolutionView;
