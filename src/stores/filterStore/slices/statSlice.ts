import { StateCreator } from "zustand";
import { BaseFilterState } from "../types";
import { statType } from "../constants";

type StatType = keyof typeof statType | undefined;

export interface StatSlice {
    statValue?: number;
    statType: StatType;
    isStatMax: boolean;

    setStatValue: (statValue?: number) => void;
    setStatType: (statType: StatType) => void;
    setStatMax: (statMax: boolean) => void;
}

type StatState = BaseFilterState & StatSlice;

export const createStatSlice: StateCreator<StatState, [], [], StatSlice> = (set) => ({

    statValue: undefined,
    statType: undefined,
    isStatMax: false,

    setStatValue: (statValue) => 
        set((state) => ({
            statValue: statValue,
            filters: { ...state.filters, statValue: statValue }
        })),

    setStatType: (statType) => 
        set((state) => ({
            statType: statType,
            filters: { ...state.filters, statType: statType }
        })),

    setStatMax: (statMax) =>
        set((state) => ({
            isStatMax: statMax,
            filters: { ...state.filters, isStatMax: statMax }
        })),

});