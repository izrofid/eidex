import { create } from "zustand";
import { Pokemon } from "@/types";
import { persist } from "zustand/middleware";

interface UIState {
  isShiny: boolean;
  selectedPokemon: Pokemon | null;
  isModalOpen: boolean;
  isCreditsOpen: boolean;
  isSidebarOpen: boolean;
  toggleShiny: () => void;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
  openModal: (pokemon: Pokemon) => void;
  closeModal: () => void;
  openCredits: () => void;
  closeCredits: () => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      //Properties
      isShiny: false,
      selectedPokemon: null,
      isModalOpen: false,
      isCreditsOpen: false,
      isSidebarOpen: false,

      //Actions
      toggleShiny: () => set((state) => ({ isShiny: !state.isShiny })),
      setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
      openModal: (pokemon) =>
        set({ selectedPokemon: pokemon, isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),
      openCredits: () => set({ isCreditsOpen: true }),
      closeCredits: () => set({ isCreditsOpen: false }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),

    {
      name: "eidex-ui-storage",
      // Only persist the shiny state
      partialize: (state) => ({ isShiny: state.isShiny }),
    },
  ),
);
