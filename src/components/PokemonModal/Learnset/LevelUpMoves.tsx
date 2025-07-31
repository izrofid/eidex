import { useUIStore } from "@/stores/uiStore";
import { Pokemon } from "../../../types";
import { getMoveData } from "../../../utils/moveData";
import MoveEntry from "./MoveEntry";
import { MoveList } from "./MoveList";
import { memo } from "react";
import CompactMoveEntry from "./CompactMoveEntry";

type LevelUpMovesProps = {
    pokemon: Pokemon;
};

const LevelUpMoves = memo(({ pokemon }: LevelUpMovesProps) => {
  const learnsetView = useUIStore((state) => state.learnsetView);
    const moves = pokemon.levelUpMoves.map((arr, index) => {
        const [moveId, level] = arr;
        const move = getMoveData(moveId);
        const moveCard = move ? (
            <MoveEntry key={`level-${index}`} move={move} level={level} />
        ) : null;

        const moveCompactList = move ? (
            <CompactMoveEntry
                key={`level-${index}`}
                move={move}
                level={level}
            />
        ) : null;
        return learnsetView === 'card' ? moveCard : moveCompactList;
    });

    return (
        <MoveList emptyMessage="No Level-Up Moves Available">{moves}</MoveList>
    );
});

export default LevelUpMoves;
