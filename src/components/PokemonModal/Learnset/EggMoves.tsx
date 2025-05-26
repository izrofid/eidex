import { Pokemon } from "../../../types";
import { getMoveData } from "../../../utils/moveData";
import { getSpeciesData } from "@/utils/speciesUtils";
import { findRootSpecies } from "@/utils/evoFamily";
import MoveEntry from "./MoveEntry";
import { MoveList } from "./MoveList";
import { memo } from "react";

type EggMovesProps = {
  pokemon: Pokemon;
};

const EggMoves = memo(({ pokemon }: EggMovesProps) => {
  // Get egg moves from root species
  const rootSpeciesId = findRootSpecies(pokemon.speciesId);
  const rootSpecies = getSpeciesData(rootSpeciesId);
  const eggMoves = rootSpecies.eggMoves ?? [];

  const moves = eggMoves.map((moveId, index) => {
    const move = getMoveData(moveId);
    return move ? (
      <MoveEntry key={`egg-${index}`} move={move} />
    ) : null;
  });

  return (
    <MoveList emptyMessage="No Egg Moves Available">
      {moves}
    </MoveList>
  );
});

export default EggMoves;
