import { create } from "zustand";
import { createMoveSlice, MoveSlice } from "./slices/moveSlice";
import { BaseFilterState } from "./types";
import { initialFilters } from "./constants";
import { createResetSlice, ResetSlice } from "./slices/resetSlice";
import { createNameSlice, NameSlice } from "./slices/nameSlice";
import { createItemSlice, ItemSlice } from "./slices/itemSlice";
import { AbilitySlice, createAbilitySlice } from "./slices/abilitySlice";
import { createTypeSlice, TypeSlice } from "./slices/typeSlice";
import { createSortSlice, SortSlice } from "./slices/sortSlice";
import { createStatSlice, StatSlice } from "./slices/statSlice";
import { createCycleSlice, CycleSlice } from "./slices/cycleSlice";

// Define the complete store type with all slices
export type FilterStore = BaseFilterState &
  NameSlice &
  AbilitySlice &
  TypeSlice &
  ItemSlice &
  MoveSlice &
  SortSlice &
  StatSlice &
  CycleSlice &
  ResetSlice;

// Create the combined store
export const useModularFilterStore = create<FilterStore>((...a) => ({
  //Filter object with initial state
  filters: initialFilters,

  // Filter slices
  ...createMoveSlice(...a),
  ...createResetSlice(...a),
  ...createNameSlice(...a),
  ...createItemSlice(...a),
  ...createAbilitySlice(...a),
  ...createTypeSlice(...a),
  ...createSortSlice(...a),
  ...createStatSlice(...a),
  ...createCycleSlice(...a),
}));
