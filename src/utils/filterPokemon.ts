import { Pokemon, FilterOptions } from "../types";
import { getAbilityName } from "./abilityData";
import { getMoveData, getTMMove, getTutorMove } from "./moveData";

function matchesNameFilter(pokemon: Pokemon, name?: string): boolean {
  return name
    ? pokemon.name.toLowerCase().includes(name.toLowerCase())
    : true;
}

function matchesTypeFilter(pokemon: Pokemon, typeId?: number): boolean {
  return typeId !== undefined
    ? pokemon.type.includes(typeId)
    : true;
}

function matchesStatFilter(
  pokemon: Pokemon,
  minStat?: number,
  statType?: string
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

function matchesAbilityFilter(
  pokemon: Pokemon,
  ability?: string
): boolean {
  if (!ability) return true;
  return pokemon.abilities.some((a) =>
    getAbilityName(a as [number, number])
      .toLowerCase()
      .includes(ability.toLowerCase())
  );
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

function matchesMove(pokemon: Pokemon, move?: string, source?: "all" | "levelup" | "tm" | "tutor"): boolean {
  if (!move) return true;
  const m = move.toLowerCase();
  if (source === "levelup" || source === "all") {
    if (pokemon.levelupMoves.some(([moveId]) => getMoveData(moveId)?.name.toLowerCase().includes(m))) return true;
  }
  if (source === "tm" || source === "all") {
    if ((pokemon.tmMoves ?? []).some(tmIndex => getTMMove(tmIndex)?.name.toLowerCase().includes(m))) return true;
  }
  if (source === "tutor" || source === "all") {
    if ((pokemon.tutorMoves ?? []).some(tutorIndex => getTutorMove(tutorIndex)?.name.toLowerCase().includes(m))) return true;
  }
  return false;
}

export function filterPokemon(
  pokemons: Pokemon[],
  filters: FilterOptions = {},
): Pokemon[] {
  const filtered = pokemons.filter((pokemon) =>
    matchesNameFilter(pokemon, filters.name) &&
    matchesTypeFilter(pokemon, filters.typeId) &&
    matchesStatFilter(pokemon, filters.minStat, filters.statType) &&
    matchesAbilityFilter(pokemon, filters.ability) &&
    matchesMove(pokemon, filters.moveName, filters.moveSource)
  );

  // Sort by dexID first, then by id if dexID is the same
  return filtered.sort((a, b) => {
    if (a.dexID !== b.dexID) {
      return a.dexID - b.dexID; // Primary sort by dexID
    }
    return a.ID - b.ID; // Secondary sort by id
  });
}