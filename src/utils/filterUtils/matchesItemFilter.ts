import { Pokemon } from "../../types";

export function matchesItemFilter(
  pokemon: Pokemon,
  heldItem: number,
): boolean {

  // nothing selected → don’t filter out
  if (!heldItem || heldItem === 0) {
    return true;
  }

  // require pokemon's heldItems array to have chosen item
  return pokemon.heldItems.includes(heldItem)
}