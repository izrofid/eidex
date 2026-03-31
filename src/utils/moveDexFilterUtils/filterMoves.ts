import { Move, MoveFilterOptions } from "@/types";
import { getMoveData, getMoveName } from "../moveData";

const matchesMoveTypeFilter = (move: number, moveType?: number): boolean => {

    return moveType ? getMoveData(move)?.type === moveType : true;
};

const matchesMoveNameFilter = (move: number, moveName?: string): boolean => {
    return moveName ? getMoveName(move).startsWith(moveName) : true;
}

export const filterMoves = (
    moves: Move[],
    moveFilters: MoveFilterOptions,
): Move[] => {
    const moveArray: Move[] = Array.isArray(moves) ? moves : Object.values(moves);
    const filteredMoves = moveArray.filter((move) =>
        matchesMoveTypeFilter(move.moveId, moveFilters.moveType) &&
        matchesMoveNameFilter(move.moveId, moveFilters.moveName)
    );

    return filteredMoves
};
