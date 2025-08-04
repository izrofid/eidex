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
  isHelpOpen: boolean;
  isCmdOpen: boolean;
  learnsetView: "list" | "card";
  activeDex: "pokemon" | "move";
  setActiveDex: (dex: "pokemon" | "move") => void;
  toggleShiny: () => void;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
  setSelectedAbility: (ability: Ability | null) => void;
  openModal: (pokemon: Pokemon) => void;
  closeModal: () => void;
  openCredits: () => void;
  closeCredits: () => void;
  toggleSidebar: () => void;
  openHelp: () => void;
  closeHelp: () => void;
  setCmdOpen: (isOpen: boolean) => void;
  setLearnsetView: (view: "list" | "card") => void;
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
      isHelpOpen: false,
      isCmdOpen: false,
      learnsetView: "card",
      activeDex: "pokemon",

      //Actions
      setActiveDex: (dex) => set({ activeDex: dex }),
      toggleShiny: () => set((state) => ({ isShiny: !state.isShiny })),
      setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
      setSelectedAbility: (ability) => set({ selectedAbility: ability }),
      openModal: (pokemon) =>
        set({ selectedPokemon: pokemon, isModalOpen: true, selectedAbility: null }), // Reset ability when opening modal
      closeModal: () => {
        // First hide the modal with animation
        set({ isModalOpen: false });
        // Then remove the Pokemon data after animation completes
        setTimeout(() => set({ selectedPokemon: null }), 300);
      },
      openCredits: () => set({ isCreditsOpen: true }),
      closeCredits: () => set({ isCreditsOpen: false }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      openHelp: () => set({ isHelpOpen: true }),
      closeHelp: () => set({ isHelpOpen: false }),
      setCmdOpen: (isOpen) => set({isCmdOpen: isOpen}),
      setLearnsetView: (view) => set({learnsetView: view})
    }),

    {
      name: "eidex-ui-storage",
      // Only persist the shiny and learnset view state
      partialize: (state) => ({ isShiny: state.isShiny, learnsetView: state.learnsetView }),
    },
  ),
);
