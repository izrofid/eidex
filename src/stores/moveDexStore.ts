
import { create } from "zustand";
import { MoveFilterOptions } from "@/types";

interface MoveDexState {
  moveFilters: MoveFilterOptions;
  setMoveName: (name: string) => void;
  setMoveType: (type: number) => void;
}

export const useMoveDexStore = create<MoveDexState>((set) => ({
    moveFilters: {
        moveName: "",
        moveType: undefined,
    },
    setMoveName: (name) => set((state) => ({
        moveFilters: { ...state.moveFilters, moveName: name },
    })),
    setMoveType: (type) => set((state) => ({
        moveFilters: { 
            ...state.moveFilters, 
            moveType: state.moveFilters.moveType === type ? undefined : type 
        },
    })),
}));
