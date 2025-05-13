import { useMemo } from "react";
import "./App.css";
import FilterBar from "./components/Filter/FilterBar";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonModal from "./components/PokemonModal/PokemonModal";
import CreditsButton from "./components/CreditsButton";
import { Switch } from "@headlessui/react";
import { filterPokemon } from "./utils/filterPokemon";
import pokemonData from "./data/speciesData.json";
import { useFilterStore } from "./stores/filterStore";
import { useUIStore } from "./stores/uiStore";
import { Pokemon } from "./types";

function App() {
  // Get filter state from Zustand store
  const { filters } = useFilterStore();

  // Get UI state from Zustand store
  const { isShiny, toggleShiny, selectedPokemon, isModalOpen } =
    useUIStore();

  // Memoized filtered Pokémon list (only updates when filters change)
  const filteredPokemon = useMemo(() => {
    return filterPokemon(pokemonData as Pokemon[], filters);
  }, [filters]);

  return (
    <div className="flex min-h-screen justify-center bg-zinc-800">
      <div className="border-1 shadow-2xl/60 flex w-full max-w-3xl flex-col rounded-lg border-neutral-900/50">
        <FilterBar />

        {/* Shiny toggle UI */}
        <div className="flex items-center justify-between gap-2 bg-neutral-800/30 px-3 py-2 select-none">
          <span className="flex flex-row items-center gap-1">
            <img
              src="shinycharm.png"
              className="h-7 w-7 object-contain"
              alt="Shiny charm"
            />
            <Switch
              checked={isShiny}
              onChange={toggleShiny}
              className="data-checked:bg-emerald-500 group inline-flex h-5 w-10 cursor-pointer items-center rounded-full bg-gray-500 transition"
            >
              <span className="group-data-checked:translate-x-6 size-3 translate-x-1 rounded-full bg-white transition" />
            </Switch>
          </span>
          <CreditsButton />
        </div>

        <PokemonList
          pokemonToShow={filteredPokemon}
          allPokemon={pokemonData as Pokemon[]}
        />

        {selectedPokemon && isModalOpen && <PokemonModal />}
      </div>
    </div>
  );
}

export default App;
