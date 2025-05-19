import { Pokemon } from "../../types";

export function matchesMoveFilter(
  pokemon: Pokemon,
  moveId?: number,
  source?: "all" | "levelup" | "tm" | "egg"
): boolean {
  if (!moveId) return true;

  const hasTmMove = pokemon.tmMoves
    ? pokemon.tmMoves.some((id) => id === moveId)
    : false;
  const hasEggMove = pokemon.eggMoves
    ? pokemon.eggMoves.some((id) => id === moveId)
    : false;

  switch (source) {
    case "levelup":
      return pokemon.levelUpMoves.some(([id]) => id === moveId);
    case "tm":
      return hasTmMove;
    case "egg":
      return hasEggMove;
    case "all":
    default:
      return (
        pokemon.levelUpMoves.some(([id]) => id === moveId) || hasTmMove
      );
  }
}
