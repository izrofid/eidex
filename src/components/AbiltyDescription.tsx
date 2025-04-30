import { Ability } from "../types";
import { getAbilityName, getAbilityDescription } from "../utils/abilityData";
import CloseButton from "./CloseButton";

type AbilityDescriptionProps = {
  selectedAbility: Ability | null;
  onClose?: () => void;
};

const AbilityDescription: React.FC<AbilityDescriptionProps> = ({
  selectedAbility,
  onClose,
}) => {
  if (!selectedAbility) return null;

  return (
    <div className="min-h-19 border-3 relative mt-4 w-full rounded-sm border-fieldset-border p-2 text-gray-200 shadow">
      <div className="font-bold">{getAbilityName(selectedAbility)}</div>
      {onClose && (
        <CloseButton
          onClick={onClose}
          size={16}
          className="absolute right-1 top-2"
        />
      )}
      <div className="whitespace-normal break-words text-sm">
        {getAbilityDescription(selectedAbility)}
      </div>
    </div>
  );
};

export default AbilityDescription;