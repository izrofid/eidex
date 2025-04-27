import { PokemonCard } from "./PokemonCard";

type PokemonListProps = {
    pokemons: any[]; 
  };

export function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <div className="flex flex-col items-center w-full border-2">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          types={pokemon.types}
          sprite={pokemon.sprite}
          stats={pokemon.stats}
          abilities={pokemon.abilities}
        />
      ))}
    </div>
  );
}