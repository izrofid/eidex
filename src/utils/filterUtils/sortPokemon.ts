import { Pokemon, SortBy } from "../../types";

export function sortPokemon(
  pokemons: Pokemon[],
  sortBy: SortBy = "dexId",
  sortStat?: string,
  descending: boolean = false,
): Pokemon[] {
  return [...pokemons].sort((a, b) => {
    let result = 0;
    switch (sortBy) {
      case "name":
        result = a.nameKey.localeCompare(b.nameKey);
        break;
      case "stat":
        if (!sortStat || sortStat === "bst") {
          const bstA = a.stats.reduce((x, y) => x + y, 0);
          const bstB = b.stats.reduce((x, y) => x + y, 0);
          result = bstA - bstB;
        } else {
          const statIndex: Record<string, number> = {
            hp: 0,
            attack: 1,
            defense: 2,
            speed: 3,
            spAtk: 4,
            spDef: 5,
          };
          const idx = statIndex[sortStat];
          result = (a.stats[idx] ?? 0) - (b.stats[idx] ?? 0);
        }
        break;
      case "index":
        result = a.index - b.index;
        break;
      case "dexId":
      default:
        if (a.dexId !== b.dexId) result = a.dexId - b.dexId;
        else result = a.index - b.index;
        break;
    }
    return descending ? -result : result;
  });
}
