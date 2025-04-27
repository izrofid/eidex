import pokemonData from "./data/pokemon.json";
import { PokemonList } from "./components/PokemonList";
import { filterPokemon } from "./utils/filterPokemon";
import { FilterBar } from "./components/FilterUI";
import { useState, useMemo, useEffect } from "react";

type FilterOptions = {
  name?: string;
  typeId?: number;
  minBST?: number;
};

function App() {
  // State for the actual filters used for searching (debounced)
  const [filters, setFilters] = useState<FilterOptions>({
    name: "",
    typeId: undefined,
    minBST: undefined,
  });

  const [isShiny, setIsShiny] = useState(false);

  // State for the raw filter input (updates immediately as user types)
  const [rawFilters, setRawFilters] = useState<FilterOptions>({
    name: "",
    typeId: undefined,
    minBST: undefined,
  });

  // Debounce delay in milliseconds
  const DEBOUNCE_DELAY = 300;

  // Effect to update filters after user stops typing for DEBOUNCE_DELAY ms
  useEffect(() => {
    // Start a timer to update filters after delay
    const handler = setTimeout(() => {
      setFilters(rawFilters);
    }, DEBOUNCE_DELAY);

    // If rawFilters changes before timer ends, clear the previous timer
    return () => {
      clearTimeout(handler);
    };
  }, [rawFilters]); // Only re-run when rawFilters changes

  // Memoized filtered Pokémon list (only updates when filters change)
  const filteredPokemon = useMemo(() => {
    return filterPokemon(pokemonData, filters);
  }, [filters]);

  return (
    <div className="flex min-h-screen justify-center bg-zinc-800">
      <div className="flex w-full max-w-3xl flex-col p-4">
        {/* Pass rawFilters and setRawFilters to FilterBar for immediate UI updates */}
        <FilterBar filters={rawFilters} setFilters={setRawFilters} />

        {/* Shiny toggle UI */}
        <div className="flex items-center gap-3 bg-gray-900/50 py-3 px-2">
          <span className="text-gray-300 font-medium">Shiny Mode</span>
          <button
            type="button"
            role="switch"
            aria-checked={isShiny}
            onClick={() => setIsShiny((prev) => !prev)}
            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 focus:outline-none ${isShiny ? "bg-blue-600" : "bg-zinc-600"}`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform duration-200 ${isShiny ? "translate-x-5" : "translate-x-1"}`}
            />
          </button>
        </div>

        <PokemonList pokemons={filteredPokemon} isShiny={isShiny} />
      </div>
    </div>
  );
}
export default App;
