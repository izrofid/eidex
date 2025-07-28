import { StatType } from "@/stores/filterStore/constants";
import { Pokemon } from "../../types";

export function matchesStatFilter(
  pokemon: Pokemon,
  statValue?: number,
  statType?: StatType,
  isStatMax?: boolean,
): boolean {
  if (statValue === undefined) return true;

  if (statType === "BST" || !statType) {
    const bst = pokemon.stats.reduce((a, b) => a + b, 0);
    return isStatMax ? bst <= statValue : bst >= statValue;
  }

  const statIndex: Record<string, number> = {
    HP: 0,
    ATK: 1,
    DEF: 2,
    SPE: 3,
    SPA: 4,
    SPD: 5,
  };
  const idx = statIndex[statType!];
  if (idx === undefined) return true;
  return isStatMax
    ? pokemon.stats[idx] <= statValue!
    : pokemon.stats[idx] >= statValue!;
}
