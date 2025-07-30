import { useUIStore } from "@/stores/uiStore";
import ShinyToggle from "../MiscUI/ShinyToggle";
import RandomiserSwitch from "../RandomiserSwitch";
import CloseButton from "../MiscUI/CloseButton";
import PokemonView from "./PokemonView";

function PokemonModal() {
  const { selectedPokemon, closeModal } = useUIStore();
  
  const handleClose = () => {
    closeModal();
  };

  if (!selectedPokemon) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30 z-50 transition-opacity duration-300 ease-in-out"
      onClick={handleClose}
    >
      <div
        className="w-xl no-scrollbar relative mx-2 my-5 h-[95dvh] max-h-screen justify-normal overflow-y-auto rounded-2xl border-0 bg-zinc-800 p-0 shadow-2xl transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex flex-row justify-between items-center px-6 py-4 bg-zinc-800/90 backdrop-blur-sm border-b border-zinc-700/30">
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
