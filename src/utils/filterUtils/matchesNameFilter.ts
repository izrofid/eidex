import { Pokemon } from "../../types";

export function matchesNameFilter(pokemon: Pokemon, name?: string): boolean {
  return name
    ? pokemon.nameKey.toLowerCase().startsWith(name.toLowerCase())
    : true;
}
