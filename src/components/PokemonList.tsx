import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import { Pokemon } from "../types";

type PokemonListProps = {
  pokemons: Pokemon[];
  isShiny?: boolean;
};

export function PokemonList({ pokemons, isShiny }: PokemonListProps) {
  const [visibleCount, setVisibleCount] = useState(10);

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

  return (
    <div className="flex w-full flex-col items-center">
      {pokemons.slice(0, visibleCount).map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} isShiny={isShiny} />
      ))}
    </div>
  );
}
