import { StateCreator } from "zustand";
import { BaseFilterState } from "../types";
import { initialFilters } from "../constants";
// Reset slice interface
export interface ResetSlice {
  resetFilters: () => void;
}

// This needs to include all slices that resetFilters will reset
type CombinedState = BaseFilterState & ResetSlice;

// Create the reset slice implementation
export const createResetSlice: StateCreator<
  CombinedState,
  [],
  [],
  ResetSlice
> = (set) => ({
  resetFilters: () => set(() => ({
    filters: initialFilters
  })),
});