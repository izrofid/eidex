import { StateCreator } from "zustand";
import { BaseFilterState } from "../types";
import { FILTER_CONSTANTS } from "../constants";

export interface NameSlice {
  name: string;
  setName: (name: string) => void;
  clearName: () => void;
}

type NameState = BaseFilterState & NameSlice;

export const createNameSlice: StateCreator<NameState, [], [], NameSlice> = (
  set
) => ({
  name: FILTER_CONSTANTS.DEFAULT_NAME,
  setName: (name) => set((state) => ({ filters: { ...state.filters, name } })),

  clearName: () =>
    set((state) => ({ filters: { ...state.filters, name: "" } })),
});
