import { create } from "zustand";
import { Pokemon, Ability } from "@/types";
import { persist } from "zustand/middleware";

interface UIState {
  isShiny: boolean;
  selectedPokemon: Pokemon | null;
  selectedAbility: Ability | null;
  isModalOpen: boolean;
  isCreditsOpen: boolean;
  isSidebarOpen: boolean;
  toggleShiny: () => void;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
  setSelectedAbility: (ability: Ability | null) => void;
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
      selectedAbility: null,
      isModalOpen: false,
      isCreditsOpen: false,
      isSidebarOpen: false,

      //Actions
      toggleShiny: () => set((state) => ({ isShiny: !state.isShiny })),
      setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
      setSelectedAbility: (ability) => set({ selectedAbility: ability }),
      openModal: (pokemon) =>
        set({ selectedPokemon: pokemon, isModalOpen: true, selectedAbility: null }), // Reset ability when opening modal
      closeModal: () => set({ isModalOpen: false, selectedAbility: null }), // Reset ability when closing modal
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
