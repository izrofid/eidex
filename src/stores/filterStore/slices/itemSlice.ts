import { StateCreator } from "zustand";
import { BaseFilterState } from "../types";
import { FILTER_CONSTANTS } from "../constants";

export interface ItemSlice {
  heldItem: number;
  setHeldItem: (itemId: number) => void;
}

type ItemState = BaseFilterState & ItemSlice;

export const createItemSlice: StateCreator<ItemState, [], [], ItemSlice> = (
  set,
) => ({
  heldItem: FILTER_CONSTANTS.DEFAULT_ITEM,
  setHeldItem: (heldItem) =>
    set((state) => ({ filters: { ...state.filters, heldItem } })),
});
