import { Pokemon, FilterOptions } from "../../types";
import { matchesNameFilter } from "./matchesNameFilter";
import { matchesTypeFilter } from "./matchesTypeFilter";
import { matchesStatFilter } from "./matchesStatFilter";
import { matchesAbilityFilter } from "./matchesAbilityFilter";
import { matchesMoveFilter } from "./matchesMoveFilter";
import { sortPokemon } from "./sortPokemon";

export function filterPokemon(
  pokemons: Pokemon[],
  filters: FilterOptions = {},
  isRandomiserActive: boolean,
): Pokemon[] {
  const filtered = pokemons.filter(
    (pokemon) =>
      matchesNameFilter(pokemon, filters.name) &&
      matchesTypeFilter(pokemon, filters.typeIds) &&
      matchesStatFilter(
        pokemon,
        filters.chosenStat,
        filters.statType,
        filters.isStatMax,
      ) &&
      matchesAbilityFilter(pokemon, isRandomiserActive, filters.abilityId) &&
      matchesMoveFilter(pokemon, filters.moveId, filters.moveSource),
  );

  // Default to true if filters.descending is undefined
  return sortPokemon(
    filtered,
    filters.sortBy,
    filters.sortStat,
    filters.descending !== undefined ? filters.descending : true,
  );
}
