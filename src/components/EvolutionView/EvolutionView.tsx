import { EvolutionFamily } from "../../utils/evoFamily";
import { FaArrowRight } from "react-icons/fa";

import Evolution from "./Evolution";
import { Pokemon } from "../../types";
import React from "react";
import { getSpeciesData } from "@/utils/speciesUtils";
import EvolutionDetails from "./EvolutionDetails";

// This is a derivative type that sets 'evolutions' to not-undefined.
// This component wont render if 'evolutions' is undefined anyways...

interface EvolutionViewProps {
  family: EvolutionFamily;
  pokemon: Pokemon;
  onClickPokemon: (pokemonId: number) => void;
}

const EvolutionView: React.FC<EvolutionViewProps> = ({
  family,
  onClickPokemon,
}) => {
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
                    onClick={() => onClickPokemon(member.id)}
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
    <>
      <div className="neutral-box flex flex-row items-center justify-evenly rounded-md p-2 py-3 text-white">
        {family.members.length > 1 ? columnsWithArrows : <p>No Evolutions</p>}
      </div>
      <div className="mt-3"><EvolutionDetails evoFamily={family} /></div>
    </>
  );
};

export default EvolutionView;
