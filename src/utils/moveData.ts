import moveDataArr from "../data/moveData.json";
import { Move } from "../types";

// Build a map from id to move for O(1) access
const moveDataMap: Record<number, Move> = {};

(moveDataArr as Move[])
  .filter((move) => move.description && move.name)
  .forEach((move) => (moveDataMap[move.id] = { ...move }));

function getMoveData(id: number): Move | undefined {
  return moveDataMap[id];
}

function getMoveName(id: number) {
  const move = getMoveData(id);
  return move ? move.name : "Unknown Move";
}

export { getMoveData, getMoveName };
