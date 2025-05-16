import { useMemo } from "react";
import "./App.css";
import FilterBar from "./components/Filter/FilterBar";
import FilterSidebar from "@/components/Filter/FilterSidebar";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonModal from "./components/PokemonModal/PokemonModal";
import { filterPokemon } from "./utils/filterPokemon";
import pokemonData from "./data/speciesData.json";
import { useFilterStore } from "./stores/filterStore";
import { Pokemon } from "./types";
import { useUIStore } from "./stores/uiStore";
import CreditsPanel from "./components/CreditsPanel";

function App() {
  // Get filter state from Zustand store
  const { filters } = useFilterStore();

  // Memoized filtered Pokémon list (only updates when filters change)
  const filteredPokemon = useMemo(() => {
    return filterPokemon(pokemonData as Pokemon[], filters);
  }, [filters]);

  const selectedPokemon = useUIStore((state) => state.selectedPokemon);
  const isModalOpen = useUIStore((state) => state.isModalOpen);

  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <div className="flex h-full w-[100%]">
      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-transparent sm:hidden"
          onClick={() => toggleSidebar()}
        />
      )}
      <div
        className={`w-(--sidebar-width) z-20 fixed max-sm:w-[90%] ${isSidebarOpen ? "" : "max-sm:hidden"}`}
      >
        <FilterSidebar></FilterSidebar>
      </div>
      <div className="sm:ml-(--sidebar-width) flex min-h-screen w-full flex-col items-center bg-zinc-950">
        <div className="w-full max-w-3xl bg-zinc-900">
          <FilterBar />
        </div>
        <div className="border-x-1 border-b-1 shadow-2xl/60 flex h-full w-full max-w-3xl flex-col">
          <CreditsPanel />
          <PokemonList
            pokemonToShow={filteredPokemon}
            allPokemon={pokemonData as Pokemon[]}
          />

          {selectedPokemon && isModalOpen && <PokemonModal />}
        </div>
      </div>
    </div>
  );
}

export default App;
