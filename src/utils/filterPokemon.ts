import { Pokemon } from "../types";
import { getAbilityName } from "./abilityData";

type FilterOptions = {
  name?: string;
  typeId?: number;
  minStat?: number;
  statType?: string;
  ability?: string;
};

function matchesNameFilter(pokemon: Pokemon, name?: string): boolean {
  return name
    ? pokemon.nameKey.toLowerCase().includes(name.toLowerCase())
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

export function filterPokemon(
  pokemons: Pokemon[],
  filters: FilterOptions = {},
): Pokemon[] {
  const filtered = pokemons.filter((pokemon) =>
    matchesNameFilter(pokemon, filters.name) &&
    matchesTypeFilter(pokemon, filters.typeId) &&
    matchesStatFilter(pokemon, filters.minStat, filters.statType) &&
    matchesAbilityFilter(pokemon, filters.ability)
  );

  // Sort by dexID first, then by id if dexID is the same
  return filtered.sort((a, b) => {
    if (a.dexID !== b.dexID) {
      return a.dexID - b.dexID; // Primary sort by dexID
    }
    return a.ID - b.ID; // Secondary sort by id
  });
}