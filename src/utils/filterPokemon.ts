import { Pokemon, FilterOptions, SortBy } from "../types";
import { randomizeAbility } from "@/randomiser/randomiser";
import { abilityWhitelist } from "@/randomiser/abilityWhitelist";
// import { getMoveData, getTMMove, getTutorMove } from "./moveData";

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
  chosenStat?: number,
  statType?: string,
  isStatMax?: boolean,
): boolean {
  if (!chosenStat) return true;

  if (statType === "bst" || !statType) {
    const bst = pokemon.stats.reduce((a, b) => a + b, 0);
    return isStatMax ? bst <= chosenStat : bst >= chosenStat;
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
  if (idx == undefined)
  {
    return true;
  }
  return isStatMax ? pokemon.stats[idx] <= chosenStat : pokemon.stats[idx] >= chosenStat;
}

function matchesAbilityFilter(
  pokemon: Pokemon, 
  isRandomiserActive: boolean, 
  abilityId?: number
): boolean {
  if (!abilityId) return true;
  const randomisedAbilities = pokemon.abilities.map((_,i) => 
    randomizeAbility(pokemon.index, i, abilityWhitelist, isRandomiserActive)
  );
  return randomisedAbilities.some((id) => id === abilityId);
}

function matchesMove(
  pokemon: Pokemon,
  moveId?: number,
  source?: "all" | "levelup" | "tm" | "egg",
): boolean {
  if (!moveId) return true;

  // Helper to check TM moves
  const hasTmMove = pokemon.tmMoves
    ? pokemon.tmMoves.some((id) => id === moveId)
    : false;
  const hasEggMove = pokemon.eggMoves
    ? pokemon.eggMoves.some((id) => id === moveId)
    : false;

  // Helper to check Tutor moves

  switch (source) {
    case "levelup":
      return pokemon.levelUpMoves.some(([id]) => id === moveId);
    case "tm":
      return hasTmMove;
    case "egg":
      return hasEggMove;
    case "all":
    default:
      return pokemon.levelUpMoves.some(([id]) => id === moveId) || hasTmMove;
  }
}

function sortPokemon(
  pokemons: Pokemon[],
  sortBy: SortBy = "dexId",
  sortStat?: string,
  descending: boolean = false, // Default to true
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
            hp: 0,
            attack: 1,
            defense: 2,
            speed: 3,
            spAtk: 4,
            spDef: 5,
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
  isRandomiserActive: boolean,
): Pokemon[] {
  const filtered = pokemons.filter(
    (pokemon) =>
      matchesNameFilter(pokemon, filters.name) &&
      matchesTypeFilter(pokemon, filters.typeId) &&
      matchesStatFilter(
        pokemon,
        filters.chosenStat,
        filters.statType,
        filters.isStatMax,
      ) &&
      matchesAbilityFilter(pokemon, isRandomiserActive, filters.abilityId) &&
      matchesMove(pokemon, filters.moveId, filters.moveSource),
  );

  // Default to true if filters.ascending is undefined
  return sortPokemon(
    filtered,
    filters.sortBy,
    filters.sortStat,
    filters.descending !== undefined ? filters.descending : true,
  );
}
