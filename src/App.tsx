import speciesData from "./data/speciesData.json";
import { PokemonList } from "./components/PokemonList/PokemonList";
import { filterPokemon } from "./utils/filterPokemon";
import FilterBar from "./components/Filter/FilterBar";
import { useState, useMemo, useEffect } from "react";
import { FilterOptions } from "./types";
import CreditsButton from "./components/CreditsButton";

const pokemonData = Object.values(speciesData);

function App() {
  // State for the actual filters used for searching (debounced)
  const [filters, setFilters] = useState<FilterOptions>({
    name: "",
    typeId: undefined,
    minStat: undefined,
    levelupMove: "",
    tmMove: "",
    tutorMove: "",
  });

  // Retrieve the shiny state from localStorage or default to false
  const [isShiny, setIsShiny] = useState(() => {
    const savedShinyState = localStorage.getItem("isShiny");
    return savedShinyState == "true"; // beacuse it's stored as a string
  });

  // State for the raw filter input (updates immediately as user types)
  const [rawFilters, setRawFilters] = useState<FilterOptions>({
    name: "",
    typeId: undefined,
    minStat: undefined,
    levelupMove: "",
    tmMove: "",
    tutorMove: "",
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

  // Effect to save shiny state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isShiny", isShiny.toString());
  }, [isShiny]);

  return (
    <div className="flex min-h-screen justify-center bg-zinc-800">
      <div className="flex w-full max-w-3xl flex-col border-neutral-900/50 border-1 rounded-lg shadow-2xl/60 mt-4">
        {/* Pass rawFilters and setRawFilters to FilterBar for immediate UI updates */}
        <FilterBar filters={rawFilters} setFilters={setRawFilters} />

        {/* Shiny toggle UI */}
        <div className="flex items-center justify-between gap-2 bg-neutral-800/30 px-3 py-2">
          <div className="flex flex-row items-center">
            <img
              src="/shinycharm.png"
              alt="Shiny Mode"
              className="h-6.5 w-6.5 object-contain"
              title="Shiny Mode"
            />
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
          <CreditsButton />
        </div>

        <PokemonList pokemons={filteredPokemon} isShiny={isShiny} />
      </div>
    </div>
  );
}
export default App;
