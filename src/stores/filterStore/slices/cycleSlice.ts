import { StateCreator } from "zustand";
import { BaseFilterState } from "../types";

export interface CycleSlice {
  megaCycle: boolean | undefined;
  nfeCycle: boolean | undefined;
  cycleMega: () => void;
  cycleNfe: () => void;
}

type CycleState = BaseFilterState & CycleSlice;

// Helper function to determine the next state in the cycle
const getNextCycleState = (state: boolean | undefined): boolean | undefined => {
  if (state === undefined)
    return true; // undefined -> true
  else if (state === true)
    return false; // true -> false
  else return undefined; // false -> undefined
};

export const createCycleSlice: StateCreator<CycleState, [], [], CycleSlice> = (
  set,
) => ({
  megaCycle: undefined,
  nfeCycle: undefined,
  cycleMega: () =>
    set((state) => {
      const nextState = getNextCycleState(state.megaCycle);
      return {
        megaCycle: nextState,
        filters: { ...state.filters, megaCycle: nextState },
      };
    }),
  cycleNfe: () =>
    set((state) => {
      const nextState = getNextCycleState(state.nfeCycle);
      return {
        nfeCycle: nextState,
        filters: { ...state.filters, nfeCycle: nextState },
      };
    }),
});
