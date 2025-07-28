import { FilterOptions, Pokemon } from "../../types";
import { matchesAbilityFilter } from "./matchesAbilityFilter";
import { matchesItemFilter } from "./matchesItemFilter";
import { matchesMegaFilter } from "./matchesMegaFilter";
import { matchesMoveFilter } from "./matchesMoveFilter";
import { matchesNameFilter } from "./matchesNameFilter";
import { matchesNfeFilter } from "./matchesNfeFilter";
import { matchesStatFilter } from "./matchesStatFilter";
import { matchesTypeFilter } from "./matchesTypeFilter";
import { sortPokemon } from "./sortPokemon";

export function filterPokemon(
  pokemons: Pokemon[] | Record<string, Pokemon>,
  filters: FilterOptions = {},
  isRandomiserActive: boolean,
): Pokemon[] {
  // Convert to array if pokemons is an object
  const pokemonArray = Array.isArray(pokemons)
    ? pokemons
    : Object.values(pokemons);

  const filtered = pokemonArray.filter(
    (pokemon) =>
      matchesNameFilter(pokemon, filters.name) &&
      matchesTypeFilter(pokemon, filters.typeIds) &&
      matchesStatFilter(
        pokemon,
        filters.statValue,
        filters.statType,
        filters.isStatMax,
      ) &&
      matchesAbilityFilter(pokemon, isRandomiserActive, filters.abilityId) &&
      matchesItemFilter(pokemon, filters.heldItem ?? 0) &&
      matchesMoveFilter(pokemon, filters.moveIds, filters.moveSource) &&
      matchesMegaFilter(pokemon, filters.megaCycle) &&
      matchesNfeFilter(pokemon, filters.nfeCycle),
  );

  // Default to true if filters.descending is undefined
  return sortPokemon(
    filtered,
    filters.sortBy,
    filters.sortStat,
    filters.sortDescending !== undefined ? filters.sortDescending : true,
  );
}
