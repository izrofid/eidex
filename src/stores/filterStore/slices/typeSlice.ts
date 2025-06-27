import { StateCreator } from "zustand";
import { BaseFilterState } from "../types";
import { FILTER_CONSTANTS } from "../constants";

export interface TypeSlice {
  typeIds: [number?, number?];
  setTypeValue: (typeId: number | undefined) => void;
}

type TypeState = BaseFilterState & TypeSlice;

export const createTypeSlice: StateCreator<TypeState, [], [], TypeSlice> = (
  set,
) => ({
  typeIds: FILTER_CONSTANTS.DEFAULT_TYPEVAL,

  setTypeValue: (id?: number) =>
    set((state) => {
      // start with only the defined selections
      if (!state.typeIds) {
        state.typeIds = [undefined, undefined];
      }
      let selected = state.typeIds.filter(
        (t): t is number => t !== undefined,
      );

      if (!id) {
        selected = [];
      } else if (selected.includes(id)) {
        // toggle off
        selected = selected.filter((x) => x !== id);
      } else if (selected.length >= 2) {
        // already two - reset to new
        selected = [id];
      } else {
        // under two - add
        selected.push(id);
      }

      // back to a fixed 2-tuple
      const next: [number?, number?] = [selected[0], selected[1]];

      return {
        typeIds: next,
        filters: { ...state.filters, typeIds: next },
      };
    }),
});
