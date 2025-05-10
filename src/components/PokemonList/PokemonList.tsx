import { useEffect, useState } from "react";
// import React from "react";
import { PokemonCard } from "./PokemonCard";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { Pokemon } from "../../types";
import { PokemonModal } from "../PokemonModal/PokemonModal";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
// import { SortBar } from "./PokemonSortBar";

type PokemonListProps = {
  pokemons: Pokemon[];
  fullPokemons: Pokemon[];
  isShiny?: boolean;
};

export function PokemonList({
  pokemons,
  fullPokemons,
  isShiny,
}: PokemonListProps) {
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const screenWidth = useScreenWidth();

  // const [sortBy, setSortBy] = React.useState<SortBy>("dexId");
  // const [sortStat, setSortStat] = React.useState<string | undefined>(undefined);

  const ignoreList: number[] = [1435];

  const excludeForms = (forms: string[] | null | undefined): boolean => {
    const bannedForms = ["totem", "gigantamax"];
    if (!forms) return false;
    return forms.some((form) => bannedForms.includes(form));
  };

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
  useBodyScrollLock(!!selectedPokemon);

  return (
    <div className="flex w-full flex-col items-center">
      {/* <SortBar
        sortBy={sortBy}
        statType={sortStat}
        onChange={(newSortBy, newStatType) => {
          setSortBy(newSortBy);
          setSortStat(newStatType);
        }}
      /> */}
      {pokemons
        .slice(0, visibleCount)
        .filter(
          (pokemon) =>
            !ignoreList.includes(pokemon.index) && !excludeForms(pokemon.forms),
        )
        .map((pokemon) => (
          <PokemonCard
            key={pokemon.index}
            {...pokemon}
            isShiny={isShiny}
            onClick={() => setSelectedPokemon(pokemon)}
            screenWidth={screenWidth}
          />
        ))}
      <PokemonModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
        isShiny={isShiny}
        onSelectPokemon={(id) => {
          const selected = fullPokemons.find((p) => p.index === id);
          setSelectedPokemon(selected || null);
        }}
      />
    </div>
  );
}
