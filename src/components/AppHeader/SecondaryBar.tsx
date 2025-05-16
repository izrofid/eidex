import FilterBar from "@/components/Filter/FilterBar";
import ShinyToggle from "./ShinyToggle.tsx"
import CreditsButton from "@/components/CreditsButton";
import { useUIStore } from "@/stores/uiStore.ts";



function SecondaryBar() {

    const isShiny = useUIStore((state) => state.isShiny)
  const toggleShiny = useUIStore((state)=> state.toggleShiny)
  return (
    <>
      <FilterBar />
      <div className="flex select-none items-center justify-between gap-2 bg-neutral-800/30 px-3 py-2">
        <ShinyToggle isShiny={isShiny} toggleShiny={toggleShiny} />
        <CreditsButton />
      </div>
    </>
  );
}

export default SecondaryBar;