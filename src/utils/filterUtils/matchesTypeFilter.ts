import { Pokemon } from "../../types";

export function matchesTypeFilter(
  pokemon: Pokemon,
  typeIds?: [number?, number?]
): boolean {

  // nothing selected → don’t filter out
  if (!typeIds) return true;

  // drop any undefined slots
  const selected = typeIds.filter((id): id is number => id !== undefined);

  // still empty → don’t filter out
  if (selected.length === 0) return true;

  // require every selected type to be on this Pokémon
  return selected.every((id) => pokemon.types.includes(id));
}