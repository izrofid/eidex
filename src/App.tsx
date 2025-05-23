import FilterSidebar from "@/components/Sidebar/FilterSidebar";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import "./App.css";
import CreditsPanel from "./components/CreditsPanel";
import FilterBar from "./components/Filter/FilterBar";
import FloatingButton from "./components/FloatingActionButton";
import PokemonList from "./components/PokemonList/PokemonList";
import pokemonData from "./data/speciesData.json";
import { useFilterStore } from "./stores/filterStore";
import { useUIStore } from "./stores/uiStore";
import { Pokemon } from "./types";
import { filterPokemon } from "./utils/filterUtils/filterPokemon";
import { useRandomiserState } from "./utils/randomiserState";
import HeaderBar from "./components/AppHeader/HeaderBar";

function App() {
  // Get filter state from Zustand store
  const { filters } = useFilterStore();
  const randomiserState = useRandomiserState();

  // Memoized filtered Pokémon list (only updates when filters or randomizer state changes)
  const filteredPokemon = useMemo(() => {
    return filterPokemon(pokemonData as Record<string, Pokemon>, filters, randomiserState.isActive);
  }, [filters, randomiserState]);

  // Create ref to store previous randomiser state for comparison
  const prevRandomiserStateRef = useRef(randomiserState);
  
  // Scroll to top when filters change, or when randomiser state changes with relevant filters active
  useEffect(() => {
    const isAbilityFilterActive = filters.abilityId !== undefined;
    
    // Check if we should scroll due to randomiser state change
    const shouldScrollForRandomiser = 
      (isAbilityFilterActive) && // Ability or move filter is active
      (prevRandomiserStateRef.current.isActive !== randomiserState.isActive || 
       prevRandomiserStateRef.current.trainerId !== randomiserState.trainerId);
    
    // Always scroll if filters change, or conditionally for randomiser changes
    if (shouldScrollForRandomiser) {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
    
    // Update ref with current state for next comparison
    prevRandomiserStateRef.current = randomiserState;
  }, [filters, randomiserState]);

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
      <div className="sm:ml-(--sidebar-width) flex min-h-screen w-full flex-col items-center bg-neutral-800">

        <div ref={ref} className="w-full sm:max-w-[60%] bg-zinc-900">
        <HeaderBar/>
          <FilterBar />
        </div>
        <div
          ref={containerRef}
          className="border-b-1 shadow-2xl/60 relative flex h-full w-full sm:max-w-[60%] flex-col"
        >
          <CreditsPanel />
          <PokemonList
            pokemonToShow={filteredPokemon}
            allPokemon={Object.values(pokemonData)}
          />

          {!inView && !isSidebarOpen && (
            <div
              className="fixed bottom-5 z-10 md:hidden"
              style={{ right: `${rightOffset}px` }}
            >
              <FloatingButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
