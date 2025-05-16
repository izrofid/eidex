import ShinyToggle from "./ShinyToggle.tsx";
import { useUIStore } from "@/stores/uiStore.ts";
import CreditsButton from "../CreditsButton.tsx";

function SecondaryBar() {
  const isShiny = useUIStore((state) => state.isShiny);
  const toggleShiny = useUIStore((state) => state.toggleShiny);
  return (
    <>
      <div className="border-1 flex select-none items-center justify-between gap-2 rounded-md border-neutral-400 px-3 py-2">
        <ShinyToggle isShiny={isShiny} toggleShiny={toggleShiny} />
        <CreditsButton />
      </div>
    </>
  );
}

export default SecondaryBar;
