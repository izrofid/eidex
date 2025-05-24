import moveData from "../data/moveData.json";
import { Move } from "../types";

// moveData is now Record<number, Move>
const moveDataMap: Record<number, Move> = moveData;

function getMoveData(id: number): Move | undefined {
  return moveDataMap[id];
}

function getMoveName(id: number) {
  const move = getMoveData(id);
  return move ? move.name : "Unknown Move";
}

export { getMoveData, getMoveName };
