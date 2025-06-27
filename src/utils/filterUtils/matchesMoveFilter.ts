import { MoveSource } from "@/stores/filterStore/types";
import { Pokemon } from "../../types";

export function matchesMoveFilter(
  pokemon: Pokemon,
  moveIds?: number[],
  source?: MoveSource,
): boolean {
  if (!moveIds || moveIds.length === 0) return true;

  const hasMove = (
    moves: number[] | undefined | null,
    moveId: number,
  ): boolean => {
    return Array.isArray(moves) && moves.includes(moveId);
  };

  const hasTmMove = (moveId: number) => hasMove(pokemon.tmMoves, moveId);

  const hasEggMove = (moveId: number) => hasMove(pokemon.eggMoves, moveId);

  const hasLevelUpMove = (moveId: number): boolean => {
    return (
      Array.isArray(pokemon.levelUpMoves) &&
      pokemon.levelUpMoves.some(([id]) => id === moveId)
    );
  };

  switch (source) {
    case "levelup":
      return moveIds.every(hasLevelUpMove);
    case "tm":
      return moveIds.every(hasTmMove);
    case "egg":
      return moveIds.every(hasEggMove);
    case "all":
    default:
      return moveIds.every(
        (moveId) =>
          hasLevelUpMove(moveId) || hasTmMove(moveId) || hasEggMove(moveId),
      );
  }
}
