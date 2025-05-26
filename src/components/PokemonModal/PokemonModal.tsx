import { useUIStore } from "@/stores/uiStore";
import ShinyToggle from "../AppHeader/ShinyToggle";
import RandomiserSwitch from "../AppHeader/RandomiserSwitch";
import CloseButton from "../CloseButton";
import PokemonView from "./PokemonView";

function PokemonModal() {
  const { selectedPokemon, closeModal } = useUIStore();

  if (!selectedPokemon) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md"
      onClick={closeModal}
    >
      <div
        className="w-xl no-scrollbar relative mx-2 my-5 h-[95dvh] max-h-screen justify-normal overflow-y-auto rounded-lg border border-gray-100 bg-zinc-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex flex-row justify-between">
          <span className="flex flex-row gap-2">
            <ShinyToggle />
            <RandomiserSwitch />
          </span>
          <span className="flex flex-row items-center gap-1 self-center"></span>
          <CloseButton onClick={closeModal} />
        </span>
        <PokemonView pokemon={selectedPokemon} />
      </div>
    </div>
  );
}

export default PokemonModal;
