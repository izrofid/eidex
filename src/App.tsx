import pokemonData from "./data/pokemon.json";
import { PokemonCard } from "./components/PokemonCard";

function App() {
  const selectedPokemon = pokemonData[0]; // Select the first Pokemon for demonstration

  const { id, name, types, sprite, stats, abilities } = selectedPokemon;

  return (
    <div>
      <PokemonCard
        id={id}
        name={name}
        types={types}
        sprite={sprite}
        stats={stats}
        abilities={abilities}
      />
    </div>
  );
}

export default App;
