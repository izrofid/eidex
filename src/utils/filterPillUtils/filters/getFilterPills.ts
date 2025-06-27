import { FilterOptions } from "@/stores/filterStore/types";
import { getTypeName } from "@/utils/typeInfo";
import { FilterPill } from "../types/types";
import { FILTER_TYPES } from "../types/constants";
import { createFilterPill } from "../utils/createFilterPill";

// Function to generate filter pills from current filter state
export function getFilterPillsFromFilters(
  filters: FilterOptions,

): FilterPill[] {
  const pills: FilterPill[] = [];

  // Name filter
  if (filters.name) {
    pills.push(
      createFilterPill({
        id: "name",
        type: FILTER_TYPES.NAME,
        label: "Name",
        value: filters.name,
      }),
    );
  }

  // Type filters
  (filters.typeIds ?? [])
    .filter((t): t is number => t !== undefined)
    .forEach((typeId) => {
      pills.push(
        createFilterPill({
          id: `type-${typeId}`,
          type: FILTER_TYPES.TYPE,
          label: `Type ${getTypeName(typeId)}`,
          value: typeId,
        }),
      );
    });

  // Ability filter
  if (filters.abilityId !== undefined) {
    pills.push(
      createFilterPill({
        id: "ability",
        type: FILTER_TYPES.ABILITY,
        label: "Ability",
        value: { id: filters.abilityId, name: filters.ability || "" },
      }),
    );
  }

  // Stat filter
  if (filters.chosenStat !== undefined) {
    pills.push(
      createFilterPill({
        id: "stat",
        type: FILTER_TYPES.STAT,
        label: filters.statType ? filters.statType.toUpperCase() : "BST",
        value: {
          stat: filters.chosenStat,
          type: filters.statType,
          isMax: !!filters.isStatMax,
        },
      }),
    );
  }

  // Item filter
  if (filters.heldItem) {
    pills.push(
      createFilterPill({
        id: "item",
        type: FILTER_TYPES.ITEM,
        label: "Held Item",
        value: filters.heldItem,
      }),
    );
  }

  // Move filters
  (filters.moveIds ?? [])
    .filter((m): m is number => m !== undefined)
    .forEach((moveId) => {
      const moveIndex = filters.moveIds?.indexOf(moveId) ?? -1;
      const moveName =
        moveIndex >= 0 && filters.moveNames?.[moveIndex]
          ? filters.moveNames[moveIndex]
          : "Move";
      const moveSource = filters.moveSource || "all";

      pills.push(
        createFilterPill({
          id: `move-${moveId}`,
          type: FILTER_TYPES.MOVE,
          label: moveName,
          value: {
            id: moveId,
            name: moveName,
            source: moveSource,
          },
        }),
      );
    });

  return pills;
}
