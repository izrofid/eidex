import { Pokemon, FilterOptions } from "../../types";
import { matchesNameFilter } from "./matchesNameFilter";
import { matchesTypeFilter } from "./matchesTypeFilter";
import { matchesStatFilter } from "./matchesStatFilter";
import { matchesAbilityFilter } from "./matchesAbilityFilter";
import { matchesMoveFilter } from "./matchesMoveFilter";
import { sortPokemon } from "./sortPokemon";
import { matchesMegaFilter } from "./matchesMegaFilter";
import { matchesNfeFilter } from "./matchesNfeFilter";
import { matchesItemFilter } from "./matchesItemFilter";

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
        filters.chosenStat,
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
