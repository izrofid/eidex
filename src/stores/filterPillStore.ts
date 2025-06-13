import { create } from "zustand";
import { useFilterStore } from "./filterStore";
import { MoveSource, SortBy } from "@/types";

// Define FilterType directly in this file
export type FilterType = "name" | "type" | "move" | "ability" | "stat" | "sort";

export type FilterPillValue =
  | { type: "name"; value: string }
  | { type: "type"; value: number | undefined }
  | { type: "ability"; value: { id: number; name: string } }
  | {
      type: "stat";
      value: {
        stat: number | undefined;
        type: string | undefined;
        isMax: boolean;
      };
    }
  | { type: "move"; value: { id: number; name: string; source: MoveSource } }
  | {
      type: "sort";
      value: { by: SortBy; stat: string | undefined; descending: boolean };
    };

// Define types for our FilterPills
export type FilterPill = {
  id: string;
  type: FilterType;
  label: string;
  value: FilterPillValue;
};

interface FilterPillsState {
  // Track currently active filter pills
  activePills: FilterPill[];

  // Utility methods
  addPill: (pill: FilterPill) => void;
  removePill: (pillId: string) => void;
  clearAllPills: () => void;

  // Sync pills with filter store
  syncWithFilters: () => void;
}

export const useFilterPillStore = create<FilterPillsState>((set, get) => ({
  activePills: [],

  addPill: (pill: FilterPill) => {
    set((state) => {
      // If pill already exists, replace it
      const exists = state.activePills.some((p) => p.id === pill.id);
      if (exists) {
        return {
          activePills: state.activePills.map((p) =>
            p.id === pill.id ? pill : p,
          ),
        };
      }

      // Otherwise add new pill
      return {
        activePills: [...state.activePills, pill],
      };
    });
  },

  removePill: (pillId: string) => {
    // First get the pill we're removing (before we remove it from state)
    const pillToRemove = get().activePills.find((p) => p.id === pillId);
    if (!pillToRemove) return;

    // Then remove it from our state
    set((state) => ({
      activePills: state.activePills.filter((p) => p.id !== pillId),
    }));

    // Access the filter store
    const filterStore = useFilterStore.getState();

    // Clear the corresponding filter based on the pill type
    switch (pillToRemove.value.type) {
      case "name":
        filterStore.setNameValue("");
        break;

      case "type":
        filterStore.setTypeValue(pillToRemove.value.value);
        break;

      case "ability":
        filterStore.setAbilityValue(null);
        break;

      case "stat":
        // Only reset the stat values, not other filter values
        filterStore.setChosenStat(undefined);
        filterStore.setStatType(undefined);
        if (pillToRemove.value.value.isMax) {
          filterStore.toggleStatMax(); // Only toggle if it was true
        }
        break;

      case "move":
        filterStore.removeMoveValue(pillToRemove.value.value);
        break;
    }
  },

  clearAllPills: () => {
    set({ activePills: [] });

    // Reset all filters in filter store
    const filterStore = useFilterStore.getState();
    filterStore.resetFilters();
  },

  syncWithFilters: () => {
    const filterStore = useFilterStore.getState();
    const { filters, typeOptions } = filterStore;
    const newPills: FilterPill[] = [];

    // Convert each active filter to a pill
    if (filters.name) {
      newPills.push({
        id: "name",
        type: "name",
        label: "Name",
        value: { type: "name", value: filters.name },
      });
    }

    const selectedTypes = (filters.typeIds ?? []).filter(
      (t): t is number => t !== undefined,
    );

    selectedTypes.forEach((typeId) => {
      const typeName =
        typeOptions.find((t) => t.typeID === typeId)?.typeName ?? "Type";

      newPills.push({
        id: `type-${typeId}`,
        type: "type",
        label: typeName,
        value: { type: "type", value: typeId },
      });
    });

    if (filters.abilityId !== undefined) {
      newPills.push({
        id: "ability",
        type: "ability",
        label: "Ability",
        value: {
          type: "ability",
          value: {
            id: filters.abilityId,
            name: filters.ability || "",
          },
        },
      });
    }

    if (filters.chosenStat !== undefined) {
      newPills.push({
        id: "stat",
        type: "stat",
        label: filters.statType ? filters.statType.toUpperCase() : "BST",
        value: {
          type: "stat",
          value: {
            stat: filters.chosenStat,
            type: filters.statType,
            isMax: !!filters.isStatMax,
          },
        },
      });
    }

    const selectedMoves = (filters.moveIds ?? []).filter(
      (m): m is number => m !== undefined,
    );

    selectedMoves.forEach((moveId) => {
      const moveIndex = filters.moveIds?.indexOf(moveId) ?? -1;
      const moveName = moveIndex >= 0 && filters.moveNames?.[moveIndex] ? filters.moveNames[moveIndex] : "Move";
      const moveSource = filters.moveSource || "all";

      newPills.push({
        id: `move-${moveId}`,
        type: "move",
        label: moveName,
        value: {
          type: "move",
          value: {
            id: moveId,
            name: moveName,
            source: moveSource,
          },
        },
      });
    });

    set({ activePills: newPills });
  },
}));
