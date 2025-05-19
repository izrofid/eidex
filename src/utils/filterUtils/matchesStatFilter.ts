import { Pokemon } from "../../types";

export function matchesStatFilter(
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
  const idx = statIndex[statType!];
  if (idx === undefined) return true;
  return isStatMax
    ? pokemon.stats[idx] <= chosenStat!
    : pokemon.stats[idx] >= chosenStat!;
}
