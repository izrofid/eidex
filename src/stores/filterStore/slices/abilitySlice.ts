import { StateCreator } from "zustand";
import { BaseFilterState } from "../types";
import { FILTER_CONSTANTS } from "../constants";

export interface AbilitySlice {
  abilityId: number;
  setAbility: (abilityId: number) => void;
}

type AbilityState = BaseFilterState & AbilitySlice;

export const createAbilitySlice: StateCreator<AbilityState, [], [], AbilitySlice> = (
  set
) => ({
  abilityId: FILTER_CONSTANTS.DEFAULT_ABILITY,
  setAbility: (abilityId) => set((state) => ({ filters: { ...state.filters, abilityId } })),

});
