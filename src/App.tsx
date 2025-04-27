import pokemonData from "./data/pokemon.json";
import { PokemonList } from "./components/PokemonList";
import { filterPokemon } from "./utils/filterPokemon";
import { FilterBar } from "./components/FilterUI";
import { useState } from "react";

type FilterOptions = {
  name?: string;
  typeId?: number;
  minBST?: number;
};

function App() {
  const [filters, setFilters] = useState<FilterOptions>({
    name: "",
    typeId: undefined,
    minBST: undefined,
  });

  // Apply filtering here!
  const filteredPokemon = filterPokemon(pokemonData, filters);

  return (
    <div className="flex min-h-screen justify-center bg-zinc-800">
      <div className="flex w-full max-w-3xl flex-col items-center px-4">
        {/* FilterBar on top */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Pokémon list below */}
        <PokemonList pokemons={filteredPokemon} />
      </div>
    </div>
  );
}

export default App;
