import { useUIStore } from "@/stores/uiStore";
import ShinyToggle from "../AppHeader/ShinyToggle";
import RandomiserSwitch from "../AppHeader/RandomiserSwitch";
import CloseButton from "../CloseButton";
import PokemonView from "./PokemonView";

function PokemonModal() {
  const { selectedPokemon, closeModal } = useUIStore();

  const handleClose = () => {
    closeModal();
  };

  if (!selectedPokemon) return null;

  return (
    <div
      className="backdrop-blur-m fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-opacity duration-300 ease-in-out"
      onClick={handleClose}
    >
      <div
        className="w-xl no-scrollbar relative mx-2 my-5 h-[95dvh] max-h-screen justify-normal overflow-y-auto rounded-xl border-0 bg-zinc-300 p-0 shadow-2xl transition-transform duration-300 ease-in-out dark:bg-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between border-b border-zinc-400/30 bg-zinc-200/90 px-6 py-4 backdrop-blur-sm dark:border-zinc-700/30 dark:bg-zinc-800/90">
          <span className="flex flex-row gap-2">
            <ShinyToggle />
            <RandomiserSwitch />
          </span>
          <span className="flex flex-row items-center gap-1 self-center"></span>
          <CloseButton onClick={handleClose} />
        </div>

        <div className="p-6">
          <PokemonView pokemon={selectedPokemon} />
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
