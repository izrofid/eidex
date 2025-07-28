import { Pokemon, SortBy } from "../../types";
import { StatType, statType } from "@/stores/filterStore/constants";

export function sortPokemon(
  pokemons: Pokemon[],
  sortBy: SortBy = "dexId",
  sortStat?: StatType,
  isDescending: boolean = false,
): Pokemon[] {
  return [...pokemons].sort((a, b) => {
    let result = 0;
    switch (sortBy) {
      case "name":
        result = a.nameKey.localeCompare(b.nameKey);
        break;
      case "stat":
        if (!sortStat || sortStat === statType.BST) {
          const bstA = a.stats.reduce((x, y) => x + y, 0);
          const bstB = b.stats.reduce((x, y) => x + y, 0);
          result = bstA - bstB;
        } else {
          const statIndex: Record<string, number> = {
            HP: 0,
            ATK: 1,
            DEF: 2,
            SPE: 3,
            SPA: 4,
            SPD: 5,
          };
          const idx = statIndex[sortStat];
          result = (a.stats[idx] ?? 0) - (b.stats[idx] ?? 0);
        }
        break;
      case "speciesId":
        result = a.speciesId - b.speciesId;
        break;
      case "dexId":
      default:
        if (a.dexId !== b.dexId) result = a.dexId - b.dexId;
        else result = a.speciesId - b.speciesId;
        break;
    }
    return isDescending ? -result : result;
  });
}
