import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import { Pokemon } from "../../types";
import PokemonModal from "../PokemonModal/PokemonModal";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import { SortBar } from "./PokemonSortBar";
import excludeForms from "@/utils/excludeForms";
import { useUIStore } from "@/stores/uiStore";
import { useFilterStore } from "@/stores/filterStore";

type PokemonListProps = {
  pokemonToShow: Pokemon[];
  allPokemon: Pokemon[];
};

export default function PokemonList({
  pokemonToShow,
}: PokemonListProps) {
  const [visibleCount, setVisibleCount] = useState(10);

  // Get UI State from store
  const {
    selectedPokemon,
    isModalOpen,
  } = useUIStore();

  //Get filter state from store
  const {
    sortBy,
    sortStat,
    setSortBy,
    setSortStat,
  } = useFilterStore();

  const ignoreList: number[] = [1435];

  // Reset visible count when the list changes
  useEffect(() => {
    // Reset to initial count or screen height adjusted count
    const initialCount = Math.max(
      10,
      Math.ceil((window.innerHeight / 100) * 1.5) // Approximate number of items to fill screen
    );
    setVisibleCount(Math.min(initialCount, pokemonToShow.length));
    
    // Force scroll to top when the list changes
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    // After scrolling to top and initial render, check if we need more items
    const timeoutId = setTimeout(() => {
      if (document.body.offsetHeight < window.innerHeight && 
          initialCount < pokemonToShow.length) {
        setVisibleCount(prev => Math.min(prev + 10, pokemonToShow.length));
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pokemonToShow.length]);

  //Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setVisibleCount((prev) => Math.min(prev + 10, pokemonToShow.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pokemonToShow.length]);

  // Prevent background scroll when modal is open
  useBodyScrollLock(isModalOpen);

  return (
    <div className="flex flex-1 w-full flex-col items-center select-none">
      <div className="w-full sticky top-0 z-10 border-neutral-800">
      <SortBar
        sortBy={sortBy}
        statType={sortStat}
        onChange={(newSortBy, newStatType) => {
        setSortBy(newSortBy);
        setSortStat(newStatType);
        }}
      />
      </div>
      <div className="w-full">
      {pokemonToShow
        .slice(0, visibleCount)
        .filter(
        (pokemon) =>
          !ignoreList.includes(pokemon.index) &&
          !excludeForms(pokemon.forms),
        )
        .map((pokemon) => (
        <PokemonCard key={pokemon.index} pokemon={pokemon} />
        ))}
      </div>
      <div className="z-50">{selectedPokemon && isModalOpen && <PokemonModal />}</div>
    </div>
  );
}
