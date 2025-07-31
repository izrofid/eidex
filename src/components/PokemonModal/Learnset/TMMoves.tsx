import { useUIStore } from "@/stores/uiStore";
import { Pokemon } from "../../../types";
import { getMoveData } from "../../../utils/moveData";
import CompactMoveEntry from "./CompactMoveEntry";
import MoveEntry from "./MoveEntry";
import { MoveList } from "./MoveList";
import { memo } from "react";

type TMMovesProps = {
  pokemon: Pokemon;
};

const TMMoves = memo(({ pokemon }: TMMovesProps) => {
  const learnsetView = useUIStore((state) => state.learnsetView);
  const moves = (pokemon.tmMoves || []).map((moveId, index) => {
    const move = getMoveData(moveId);
    
        const moveCard = move ? (
            <MoveEntry key={`level-${index}`} move={move} />
        ) : null;

        const moveCompactList = move ? (
            <CompactMoveEntry
                key={`tm-${index}`}
                move={move}
            />
        ) : null;
        return learnsetView === 'card' ? moveCard : moveCompactList;
  });

  return (
    <MoveList emptyMessage="No TM/HM Moves Available">
      {moves}
    </MoveList>
  );
});

export default TMMoves;
