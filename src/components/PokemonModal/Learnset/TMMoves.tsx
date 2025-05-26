import { Pokemon } from "../../../types";
import { getMoveData } from "../../../utils/moveData";
import MoveEntry from "./MoveEntry";
import { MoveList } from "./MoveList";
import { memo } from "react";

type TMMovesProps = {
  pokemon: Pokemon;
};

const TMMoves = memo(({ pokemon }: TMMovesProps) => {
  const moves = (pokemon.tmMoves || []).map((moveId, index) => {
    const move = getMoveData(moveId);
    return move ? (
      <MoveEntry key={`tm-${index}`} move={move} />
    ) : null;
  });

  return (
    <MoveList emptyMessage="No TM/HM Moves Available">
      {moves}
    </MoveList>
  );
});

export default TMMoves;
