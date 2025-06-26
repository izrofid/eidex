import { create } from "zustand";
import { createMoveSlice, MoveSlice } from "./slices/moveSlice";
import { BaseFilterState } from "./types";
import { initialFilters } from "./constants";
import { createResetSlice, ResetSlice } from "./slices/resetSlice";

// Define the complete store type with all slices
export type FilterStore = BaseFilterState & MoveSlice & ResetSlice;

// Create the combined store
export const useModularFilterStore = create<FilterStore>((...a) => ({
  filters: initialFilters,

  ...createMoveSlice(...a),
  ...createResetSlice(...a),
}));
