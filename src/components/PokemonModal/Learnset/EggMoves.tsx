import { Pokemon } from "../../../types";
import { getMoveData } from "../../../utils/moveData";
import { getSpeciesData } from "@/utils/speciesUtils";
import { findRootSpecies } from "@/utils/evoFamily";
import MoveEntry from "./MoveEntry";
import { memo } from "react";

type EggMovesProps = {
  pokemon: Pokemon;
};

const EggMoves = memo(({ pokemon }: EggMovesProps) => {
  // Get egg moves from root species
  const rootSpeciesId = findRootSpecies(pokemon.speciesId);
  const rootSpecies = getSpeciesData(rootSpeciesId);
  const eggMoves = rootSpecies.eggMoves ?? [];

  if (eggMoves.length === 0) {
    return (
      <div className="text-center py-3 text-zinc-400 font-lexend font-light">
        No Egg Moves Available
      </div>
    );
  }

  return (
    <div className="text-center font-bold text-white">
      <ul>
        {eggMoves.map((moveId, index) => {
          const move = getMoveData(moveId);
          return move ? (
            <li key={`egg-${index}`}>
              <MoveEntry move={move} />
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
});

export default EggMoves;
