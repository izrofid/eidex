import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type TrainerIdInfo = {
  trainerId: number;
  secretId: number;
  fullId: number;
  sectorIndex: number;
};

interface RandomiserStore {
  trainerIdInfo: TrainerIdInfo | null;
  setTrainerIdInfo: (info: TrainerIdInfo | null | undefined) => void;
  isRandomiserActive: boolean;
  toggleRandomiserActive: () => void;
  disableRandomiserActive: () => void;
}

export const useRandomiserStore = create<RandomiserStore>()(
  persist(
    (set) => ({
      trainerIdInfo: null,
      setTrainerIdInfo: (info) => set({ trainerIdInfo: info }),
      isRandomiserActive: false,
      toggleRandomiserActive: () => set((state) => ({ isRandomiserActive: !state.isRandomiserActive })),
      disableRandomiserActive: () => set(() => ({ isRandomiserActive: false })),
    }),
    {
      name: "eidex-trainer-id", // storage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        trainerIdInfo: state.trainerIdInfo,
        isRandomiserActive: state.isRandomiserActive,
      }),
    },
  ),
);
