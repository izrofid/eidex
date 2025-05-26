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
      <div className="w-full sticky top-0 z-10">
      <SortBar
        sortBy={sortBy}
        statType={sortStat}
        onChange={(newSortBy, newStatType) => {
        setSortBy(newSortBy);
        setSortStat(newStatType);
        }}
      />
      </div>
      <div className="w-full divide-y divide-zinc-700/80">
        {(() => {
          const filteredPokemon = pokemonToShow
            .slice(0, visibleCount)
            .filter(
              (pokemon) =>
                !ignoreList.includes(pokemon.speciesId) &&
                !excludeForms(pokemon.forms)
            );

          return filteredPokemon.length > 0 ? (
            filteredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.speciesId} pokemon={pokemon} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="rounded-full bg-zinc-700/10 p-6 mb-4">
                <svg
                  className="w-12 h-12 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-zinc-200 mb-1">
                No Pokémon Found
              </h3>
              <p className="text-zinc-400 text-center max-w-sm">
                Try adjusting your filters or search criteria to find more Pokémon
              </p>
            </div>
          );
        })()}
      </div>
      <div className="z-50">{selectedPokemon && isModalOpen && <PokemonModal />}</div>
    </div>
  );
}
