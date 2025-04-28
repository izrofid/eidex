import { Pokemon } from "../types";

type FilterOptions = {
  name?: string;
  typeId?: number;
  minStat?: number;
  statType?: string;
};

export function filterPokemon(
  pokemons: Pokemon[],
  filters: FilterOptions = {},
): Pokemon[] {
  return pokemons.filter((pokemon) => {
    // Name filter
    const matchesName = filters.name
      ? pokemon.name.toLowerCase().includes(filters.name.toLowerCase())
      : true;

    // Type filter
    const matchesType =
      filters.typeId !== undefined
        ? pokemon.types.includes(filters.typeId)
        : true;

    // Stat filter
    let matchesStat = true;
    if (filters.minStat !== undefined) {
      if (filters.statType === "bst" || !filters.statType) {
        // BST check (sum of all stats)
        matchesStat = pokemon.stats.reduce((a: number, b: number) => a + b, 0) >= filters.minStat;
      } else {
        // Individual stat check
        const statIndex = {
          hp: 0,
          attack: 1, 
          defense: 2,
          speed: 3,
          spAtk: 4,
          spDef: 5
        }[filters.statType];
        
        if (statIndex !== undefined) {
          matchesStat = pokemon.stats[statIndex] >= filters.minStat;
        }
      }
    }

    return matchesName && matchesType && matchesStat;
  });
}