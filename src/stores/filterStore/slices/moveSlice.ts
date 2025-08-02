import { StateCreator } from "zustand";
import { BaseFilterState, MoveSource } from "../types";
import { ComboBoxEntry } from "@/components/Filter/FilterComponents/GenericComboBox";
import { FILTER_CONSTANTS } from "../constants";

// Move slice interface
export interface MoveSlice {
  moveSource: MoveSource;
  moveValues: ComboBoxEntry[];
  setMoveSource: (source: MoveSource) => void;
  setMoveValue: (value: ComboBoxEntry | null) => void;
  removeMoveValue: (value: ComboBoxEntry | null) => void;
}

type MoveState = BaseFilterState & MoveSlice

export const createMoveSlice: StateCreator<MoveState, [], [], MoveSlice> = (set) => ({
  // Initial state
  moveSource: FILTER_CONSTANTS.DEFAULT_MOVE_SOURCE,
  moveValues: [],

  // Actions
  setMoveSource: (source) =>
    set((state) => ({
      moveSource: source,
      filters: { ...state.filters, moveSource: source },
    })),

  setMoveValue: (value) =>
    set((state) => {
      if (!value) {
        return {
          moveValues: [],
          filters: {
            ...state.filters,
            moveIds: [],
            moveNames: [],
          },
        };
      }

      // Don't add if we already have max moves or if the move is already in the list
      const currentMoves = state.moveValues || [];
      if (currentMoves.length >= FILTER_CONSTANTS.MAX_MOVES || 
          currentMoves.some(move => move.id === value.id)) {
        return state;
      }

      const newMoves = [...currentMoves, value];
      return {
        moveValues: newMoves,
        filters: {
          ...state.filters,
          moveIds: newMoves.filter(move => move.id !== null).map(move => move.id as number),
          moveNames: newMoves.map(move => move.name),
        },
      };
    }),

  removeMoveValue: (value) =>
    set((state) => {
      if (!value) {
        return {
          moveValues: [],
          filters: {
            ...state.filters,
            moveIds: [],
            moveNames: [],
          },
        };
      }

      const currentMoves = state.moveValues || [];
      const newMoves = currentMoves.filter(move => move.id !== value.id);

      return {
        moveValues: newMoves,
        filters: {
          ...state.filters,
          moveIds: newMoves.filter(move => move.id !== null).map(move => move.id as number),
          moveNames: newMoves.map(move => move.name),
        },
      };
    }),
});