import speciesData from "./data/speciesData.json";
import { PokemonList } from "./components/PokemonList/PokemonList";
import { filterPokemon } from "./utils/filterPokemon";
import FilterBar from "./components/Filter/FilterBar";
import { useState, useMemo, useEffect } from "react";
import { FilterOptions, SortBy } from "./types";
import CreditsButton from "./components/CreditsButton";
import { Switch } from "@headlessui/react";

const pokemonData = Object.values(speciesData);

function App() {
  const [sortBy, setSortBy] = useState<SortBy>("dexId");
  const [sortStat, setSortStat] = useState<string | undefined>(undefined);
  const [descending, setDescending] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    name: "",
    typeId: undefined,
    minStat: undefined,
    levelupMove: "",
    tmMove: "",
    tutorMove: "",
    sortBy,
    sortStat,
    descending,
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
    sortBy,
    sortStat,
    descending,
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

  useEffect(() => {
    setFilters((prev) => ({ ...prev, sortBy, sortStat, descending }));
    setRawFilters((prev) => ({ ...prev, sortBy, sortStat, descending }));
  }, [sortBy, sortStat, descending]);

  return (
    <div className="flex min-h-screen justify-center bg-zinc-800">
      <div className="border-1 shadow-2xl/60 flex w-full max-w-3xl flex-col rounded-lg border-neutral-900/50">
        {/* Pass rawFilters and setRawFilters to FilterBar for immediate UI updates */}
        <FilterBar filters={rawFilters} setFilters={setRawFilters} />

        {/* Shiny toggle UI */}
        <div className="flex items-center justify-between gap-2 bg-neutral-800/30 px-3 py-2">
            <span className="flex flex-row gap-1 items-center">
          <img src="shinycharm.png" className="object-contain h-7 w-7"></img>
          <Switch
            checked={isShiny}
            onChange={()=>setIsShiny((prev) => !prev)}
            className="data-checked:bg-emerald-500 group inline-flex h-5 w-10 items-center rounded-full bg-gray-500 transition cursor-pointer"
          >
            <span className="group-data-checked:translate-x-6 size-3 translate-x-1 rounded-full bg-white transition" />
          </Switch>
          </span>
          <CreditsButton />
        </div>

        <PokemonList
          pokemons={filteredPokemon}
          fullPokemons={pokemonData}
          isShiny={isShiny}
          sortStat={sortStat}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setSortStat={setSortStat}
          descending={descending}
          setDescending={setDescending}
          onChangeShiny={() => setIsShiny((prev) => !prev)}
        />
      </div>
    </div>
  );
}
export default App;
