import { create } from "zustand";
import { createMoveSlice, MoveSlice } from "./slices/moveSlice";
import { BaseFilterState } from "./types";
import { initialFilters } from "./constants";
import { createResetSlice, ResetSlice } from "./slices/resetSlice";
import { createNameSlice, NameSlice } from "./slices/nameSlice";

// Define the complete store type with all slices
export type FilterStore = BaseFilterState & NameSlice & MoveSlice & ResetSlice;

// Create the combined store
export const useModularFilterStore = create<FilterStore>((...a) => ({
    
  //Filter object with initial state
  filters: initialFilters,

  // Filter slices
  ...createMoveSlice(...a),
  ...createResetSlice(...a),
  ...createNameSlice(...a),
}));
