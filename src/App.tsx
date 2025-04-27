import pokemonData from "./data/pokemon.json";
import { PokemonList } from "./components/PokemonList";

function App() {
  return (
    <div>
      <PokemonList pokemons={pokemonData} />
    </div>
  );
}

export default App;
