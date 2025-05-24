import { Pokemon } from "../../../types";
import { getMoveData } from "../../../utils/moveData";
import MoveEntry from "./MoveEntry";
import { memo } from "react";

type LevelUpMovesProps = {
  pokemon: Pokemon;
};

const LevelUpMoves = memo(({ pokemon }: LevelUpMovesProps) => {
  if (pokemon.levelUpMoves.length === 0) {
    return (
      <div className="text-center font-bold text-white">
        No Level-Up Moves Available
      </div>
    );
  }

  return (
    <div className="text-center font-bold text-white">
      <ul>
        {pokemon.levelUpMoves.map((arr, index) => {
          const [moveId, level] = arr;
          const move = getMoveData(moveId);
          return move ? (
            <li key={`level-${index}`}>
              <MoveEntry move={move} level={level} />
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
});

export default LevelUpMoves;
