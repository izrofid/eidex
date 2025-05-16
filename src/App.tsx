import FilterSidebar from "@/components/Filter/FilterSidebar";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import "./App.css";
import CreditsPanel from "./components/CreditsPanel";
import FilterBar from "./components/Filter/FilterBar";
import FloatingButton from "./components/FloatingActionButton";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonModal from "./components/PokemonModal/PokemonModal";
import pokemonData from "./data/speciesData.json";
import { useFilterStore } from "./stores/filterStore";
import { useUIStore } from "./stores/uiStore";
import { Pokemon } from "./types";
import { filterPokemon } from "./utils/filterPokemon";

function App() {
  // Get filter state from Zustand store
  const { filters } = useFilterStore();

  // Memoized filtered Pokémon list (only updates when filters change)
  const filteredPokemon = useMemo(() => {
    return filterPokemon(pokemonData as Pokemon[], filters);
  }, [filters]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [filters]);

  const selectedPokemon = useUIStore((state) => state.selectedPokemon);
  const isModalOpen = useUIStore((state) => state.isModalOpen);

  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  const containerRef = useRef<HTMLDivElement>(null);
  const [rightOffset, setRightOffset] = useState(16);

  useEffect(() => {
    function updateButtonPosition() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const distanceFromRight = window.innerWidth - rect.right;
        setRightOffset(distanceFromRight > 16 ? distanceFromRight : 16);
        console.log("Distance from right:", distanceFromRight);
      }
    }

    updateButtonPosition();

    window.addEventListener("resize", updateButtonPosition);
    return () => window.removeEventListener("resize", updateButtonPosition);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <div className="flex h-full w-[100%]">
      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-transparent sm:hidden"
          onClick={() => toggleSidebar()}
        />
      )}
      <div
        className={`w-(--sidebar-width) fixed z-20 max-sm:w-[90%] ${isSidebarOpen ? "" : "max-sm:hidden"}`}
      >
        <FilterSidebar />
      </div>
      <div className="sm:ml-(--sidebar-width) flex min-h-screen w-full flex-col items-center bg-neutral-900">
        <div ref={ref} className="w-full max-w-3xl bg-zinc-900">
          <FilterBar />
        </div>
        <div
          ref={containerRef}
          className="border-x-1 border-b-1 shadow-2xl/60 relative flex h-full w-full max-w-3xl flex-col"
        >
          <CreditsPanel />
          <PokemonList
            pokemonToShow={filteredPokemon}
            allPokemon={pokemonData as Pokemon[]}
          />

          {!inView && !isSidebarOpen && (
            <div
              className="fixed bottom-5 z-10 md:hidden"
              style={{ right: `${rightOffset}px` }}
            >
              <FloatingButton />
            </div>
          )}

          {selectedPokemon && isModalOpen && <PokemonModal />}
        </div>
      </div>
    </div>
  );
}

export default App;
