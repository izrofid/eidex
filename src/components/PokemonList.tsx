import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import { Pokemon } from "../types";
import { PokemonModal } from "./PokemonModal";

type PokemonListProps = {
  pokemons: Pokemon[];
  isShiny?: boolean;
};

export function PokemonList({ pokemons, isShiny }: PokemonListProps) {
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setVisibleCount((prev) => Math.min(prev + 10, pokemons.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pokemons.length]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedPokemon) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPokemon]);

  return (
    <div className="flex w-full flex-col items-center">
      {pokemons.slice(0, visibleCount).map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          {...pokemon}
          isShiny={isShiny}
          onClick={() => setSelectedPokemon(pokemon)}
        />
      ))}
      <PokemonModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
        isShiny={isShiny}
      />
    </div>
  );
}
