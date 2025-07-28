import { StateCreator } from "zustand";
import { BaseFilterState, SortBy } from "../types";
import { FILTER_CONSTANTS, statType } from "../constants";

export interface SortSlice {
  sortStat: keyof typeof statType;
  sortBy: string | undefined;
  isDescending: boolean;
  setSortStat: (stat: keyof typeof statType) => void;
  setSortBy: (sortBy: SortBy) => void;
  setIsDescending: (isDescending: boolean) => void;
}

type SortState = BaseFilterState & SortSlice;

export const createSortSlice: StateCreator<SortState, [], [], SortSlice> = (
  set,
) => ({
  sortStat: statType.BST,
  sortBy: FILTER_CONSTANTS.DEFAULT_SORT,
  isDescending: false,
  
  setSortStat: (stat) =>
    set((state) => ({
      sortStat: stat,
      filters: { ...state.filters, sortStat: stat as typeof state.filters.sortStat },
    })),

  setSortBy: (sortBy) =>
    set((state) => ({
      sortBy,
      filters: {
        ...state.filters,
        sortBy: sortBy as typeof state.filters.sortBy,
      },
    })),

  setIsDescending: (isDescending) =>
    set((state) => ({
      isDescending,
      filters: { ...state.filters, sortDescending: isDescending },
    })),
});
