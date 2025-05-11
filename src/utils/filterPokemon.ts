import { Pokemon, FilterOptions, SortBy } from "../types";
// import { getMoveData, getTMMove, getTutorMove } from "./moveData";
import tmMoves from "../data/tmMoves.json";
import tutorMoves from "../data/tutorMoves.json";

function matchesNameFilter(pokemon: Pokemon, name?: string): boolean {
  return name
    ? pokemon.nameKey.toLowerCase().includes(name.toLowerCase())
    : true;
}

function matchesTypeFilter(pokemon: Pokemon, typeId?: number): boolean {
  return typeId !== undefined ? pokemon.types.includes(typeId) : true;
}

function matchesStatFilter(
  pokemon: Pokemon,
  minStat?: number,
  statType?: string,
): boolean {
  if (minStat === undefined) return true;

  if (statType === "bst" || !statType) {
    const bst = pokemon.stats.reduce((a, b) => a + b, 0);
    return bst >= minStat;
  }

  const statIndex: Record<string, number> = {
    hp: 0,
    attack: 1,
    defense: 2,
    speed: 3,
    spAtk: 4,
    spDef: 5,
  };
  const idx = statIndex[statType];
  return idx !== undefined ? pokemon.stats[idx] >= minStat : true;
}

function matchesAbilityFilter(pokemon: Pokemon, abilityId?: number): boolean {
  if (!abilityId) return true;
  return pokemon.abilities.some((id) => id === abilityId);
}

// function matchesLevelupMove(pokemon: Pokemon, move?: string): boolean {
//   if (!move) return true;
//   // Each entry in levelupMoves is [moveId, level]
//   return pokemon.levelupMoves.some(([moveId]) => {
//     const moveData = getMoveData(moveId);
//     return moveData?.name.toLowerCase().includes(move.toLowerCase());
//   });
// }

// function matchesTmMove(pokemon: Pokemon, move?: string): boolean {
//   if (!move) return true;
//   if (!pokemon.tmMoves) return false;
//   return pokemon.tmMoves.some((tmIndex) => {
//     const tmMove = getTMMove(tmIndex);
//     return tmMove?.name.toLowerCase().includes(move.toLowerCase());
//   });
// }

// function matchesTutorMove(pokemon: Pokemon, move?: string): boolean {
//   if (!move) return true;
//   if (!pokemon.tutorMoves) return false;
//   return pokemon.tutorMoves.some((tutorIndex) => {
//     const tutorMove = getTutorMove(tutorIndex);
//     return tutorMove?.name.toLowerCase().includes(move.toLowerCase());
//   });
// }

function matchesMove(
  pokemon: Pokemon,
  moveId?: number,
  source?: "all" | "levelup" | "tm" | "tutor",
): boolean {
  if (!moveId) return true;

  // Helper to check TM moves
  const hasTmMove = (pokemon.tmMoves ?? []).some((tmIndex) => {
    const tmMoveId = (tmMoves as Record<string, number>)[tmIndex];
    return tmMoveId === moveId;
  });

  // Helper to check Tutor moves
  const hasTutorMove = (pokemon.tutorMoves ?? []).some((tutorIndex) => {
    const tutorMoveId = (tutorMoves as Record<string, number>)[tutorIndex];
    return tutorMoveId === moveId;
  });

  switch (source) {
    case "levelup":
      return pokemon.levelUpMoves.some(([id]) => id === moveId);
    case "tm":
      return hasTmMove;
    case "tutor":
      return hasTutorMove;
    case "all":
    default:
      return (
        pokemon.levelUpMoves.some(([id]) => id === moveId) ||
        hasTmMove ||
        hasTutorMove
      );
  }
}

function sortPokemon(
  pokemons: Pokemon[],
  sortBy: SortBy = "dexId",
  sortStat?: string,
  descending: boolean = false // Default to true
): Pokemon[] {
  return [...pokemons].sort((a, b) => {
    let result = 0;
    switch (sortBy) {
      case "name":
        result = a.nameKey.localeCompare(b.nameKey);
        break;
      case "stat":
        if (!sortStat || sortStat === "bst") {
          const bstA = a.stats.reduce((x, y) => x + y, 0);
          const bstB = b.stats.reduce((x, y) => x + y, 0);
          result = bstA - bstB;
        } else {
          const statIndex: Record<string, number> = {
            hp: 0, attack: 1, defense: 2, speed: 3, spAtk: 4, spDef: 5,
          };
          const idx = statIndex[sortStat];
          result = (a.stats[idx] ?? 0) - (b.stats[idx] ?? 0);
        }
        break;
      case "index":
        result = a.index - b.index;
        break;
      case "dexId":
      default:
        if (a.dexId !== b.dexId) result = a.dexId - b.dexId;
        else result = a.index - b.index;
        break;
    }
    return descending ? -result : result;
  });
}

export function filterPokemon(
  pokemons: Pokemon[],
  filters: FilterOptions = {},
): Pokemon[] {
  const filtered = pokemons.filter((pokemon) =>
    matchesNameFilter(pokemon, filters.name) &&
    matchesTypeFilter(pokemon, filters.typeId) &&
    matchesStatFilter(pokemon, filters.minStat, filters.statType) &&
    matchesAbilityFilter(pokemon, filters.abilityId) &&
    matchesMove(pokemon, filters.moveId, filters.moveSource)
  );

  // Default to true if filters.ascending is undefined
  return sortPokemon(filtered, filters.sortBy, filters.sortStat, filters.descending !== undefined ? filters.descending : true);
}
