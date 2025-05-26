import { Pokemon } from "../../../types";
import { getMoveData } from "../../../utils/moveData";
import MoveEntry from "./MoveEntry";
import { MoveList } from "./MoveList";
import { memo } from "react";

type LevelUpMovesProps = {
  pokemon: Pokemon;
};

const LevelUpMoves = memo(({ pokemon }: LevelUpMovesProps) => {
  const moves = pokemon.levelUpMoves.map((arr, index) => {
    const [moveId, level] = arr;
    const move = getMoveData(moveId);
    return move ? (
      <MoveEntry key={`level-${index}`} move={move} level={level} />
    ) : null;
  });

  return (
    <MoveList emptyMessage="No Level-Up Moves Available">
      {moves}
    </MoveList>
  );
});

export default LevelUpMoves;
