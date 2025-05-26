import { Pokemon } from "../../../types";
import { getMoveData } from "../../../utils/moveData";
import MoveEntry from "./MoveEntry";
import { memo } from "react";

type TMMovesProps = {
  pokemon: Pokemon;
};

const TMMoves = memo(({ pokemon }: TMMovesProps) => {
  if (!pokemon.tmMoves || pokemon.tmMoves.length === 0) {
    return (
      <div className="text-center py-3 text-zinc-400 font-lexend font-light">
        No TM/HM Moves Available
      </div>
    );
  }

  return (
    <div className="text-center font-bold text-white">
      <ul>
        {pokemon.tmMoves.map((moveId, index) => {
          const move = getMoveData(moveId);
          return move ? (
            <li key={`tm-${index}`}>
              <MoveEntry move={move} />
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
});

export default TMMoves;
