import moveDataArr from '../data/moveData.json';
import { Move } from '../types';

// Build a map from id to move for O(1) access
const moveDataMap: Record<number, Move> = {};
(moveDataArr as Move[]).forEach((move, idx) => {
    moveDataMap[move.id ?? idx] = { ...move, id: move.id ?? idx };
});

function getMoveData(id: number): Move | undefined {
    return moveDataMap[id];
}

function getMoveName(id: number) {
    const move = getMoveData(id);
    return move ? move.name : 'Unknown Move';
}

export { getMoveData, getMoveName };