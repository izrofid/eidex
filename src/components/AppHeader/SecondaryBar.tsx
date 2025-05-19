import ShinyToggle from "./ShinyToggle.tsx";
import { useUIStore } from "@/stores/uiStore.ts";
import CreditsButton from "../CreditsButton.tsx";
import { SaveFileButton } from "../SaveFileButton.tsx";
import {
  splitSaveIntoChunks,
  getTrainerIdFromSectors,
} from "@/randomiser/trainerIdExtractor.ts";
import RandomiserSwitch from "./RandomiserSwitch.tsx";

function SecondaryBar() {
  const isShiny = useUIStore((state) => state.isShiny);
  const toggleShiny = useUIStore((state) => state.toggleShiny);
  return (
    <div className="border-1 flex select-none justify-between rounded-md border-neutral-400 px-3 py-2">
      <div className="flex flex-row items-center gap-2">
        <ShinyToggle isShiny={isShiny} toggleShiny={toggleShiny} />
        <RandomiserSwitch />
      </div>
      <div className="flex flex-row gap-2">
        <SaveFileButton
          onSaveRead={(buf: ArrayBuffer) => {
            try {
              const sectors = splitSaveIntoChunks(buf);
              const trainerInfo = getTrainerIdFromSectors(sectors);
              console.log(trainerInfo);
            } catch (e) {
              console.error(e);
            }
          }}
        />
        <CreditsButton />
      </div>
    </div>
  );
}

export default SecondaryBar;
