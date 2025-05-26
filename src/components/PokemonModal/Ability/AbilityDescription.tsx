import { getAbilityName, getAbilityDescription } from "../../../utils/abilityData";
import CloseButton from "../../CloseButton";
import { useUIStore } from "@/stores/uiStore";

const AbilityDescription: React.FC = () => {
  const { selectedAbility, setSelectedAbility } = useUIStore();
  
  if (!selectedAbility) return null;

  // Get the ability ID - we could potentially determine if it's a hidden ability
  // For now using a color gradient that complements both badge types
  return (
    <div className="min-h-19 relative w-full rounded-xl bg-zinc-800/90 p-4 text-gray-200 shadow-sm transition-all duration-200 ease-in-out border border-zinc-700/30">
      <div className="mb-2 font-chakra font-medium bg-gradient-to-r from-sky-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">{getAbilityName(selectedAbility)}</div>
      <CloseButton
        onClick={() => setSelectedAbility(null)}
        size={16}
        className="absolute right-3 top-3"
      />
      <div className="mt-2 whitespace-normal break-words text-sm leading-relaxed font-lexend">
        {getAbilityDescription(selectedAbility)}
      </div>
    </div>
  );
};

export default AbilityDescription;
