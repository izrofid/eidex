import { getAbilityName, getAbilityDescription } from "../../../utils/abilityData";
import CloseButton from "../../CloseButton";
import { useUIStore } from "@/stores/uiStore";

const AbilityDescription: React.FC = () => {
  const { selectedAbility, setSelectedAbility } = useUIStore();
  
  if (!selectedAbility) return null;

  return (
    <div className="neutral-box min-h-19 relative w-full rounded-sm p-2 text-gray-200 shadow-sm">
      <div className="font-bold">{getAbilityName(selectedAbility)}</div>
      <CloseButton
        onClick={() => setSelectedAbility(null)}
        size={16}
        className="absolute right-1 top-2"
      />
      <div className="whitespace-normal break-words text-sm">
        {getAbilityDescription(selectedAbility)}
      </div>
    </div>
  );
};

export default AbilityDescription;
