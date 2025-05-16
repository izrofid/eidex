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
import SecondaryBar from "./components/AppHeader/SecondaryBar";
import { useUIStore } from "./stores/uiStore";

function App() {
  // Get filter state from Zustand store
  const { filters } = useFilterStore();

  // Memoized filtered Pokémon list (only updates when filters change)
  const filteredPokemon = useMemo(() => {
    return filterPokemon(pokemonData as Pokemon[], filters);
  }, [filters]);


  const selectedPokemon = useUIStore((state => state.selectedPokemon))
  const isModalOpen = useUIStore((state) => state.isModalOpen)

  return (
    <div className="flex">
      <div className="w-(--sidebar-width) fixed max-sm:hidden">
        <FilterSidebar></FilterSidebar>
        <SecondaryBar/>
      </div>
      <div className="sm:ml-(--sidebar-width) items-center flex flex-col min-h-screen w-full bg-zinc-800">
        <div className="w-full max-w-3xl"><FilterBar/></div>
        <div className="border-1 shadow-2xl/60 flex w-full h-full max-w-3xl flex-col rounded-lg border-neutral-900/50">
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
