import FilterPill from "./FilterPill";
import { getTypeName } from "../../utils/typeInfo";
import { ComboBoxEntry } from "./GenericComboBox";

type CurrentFiltersProps = {
  name?: string;
  onClearName?: () => void;
  typeId?: number;
  onClearType?: () => void;
  abilityValue?: ComboBoxEntry | null;
  onClearAbility?: () => void;
  moveValue?: ComboBoxEntry | null;
  onClearMove?: () => void;
};

export default function CurrentFilters({
  name,
  onClearName,
  typeId,
  onClearType,
  abilityValue,
  onClearAbility,
  moveValue,
  onClearMove,
}: CurrentFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 my-2">
      {name && (
        <FilterPill bg="bg-emerald-700" onClick={onClearName}>
          Name: {name}
        </FilterPill>
      )}
      {typeId !== undefined && (
        <FilterPill bg="bg-blue-700" onClick={onClearType}>
          Type: {getTypeName(typeId)}
        </FilterPill>
      )}
      {abilityValue && (
        <FilterPill bg="bg-purple-700" onClick={onClearAbility}>
          Ability: {abilityValue.name}
        </FilterPill>
      )}
      {moveValue && (
        <FilterPill bg="bg-orange-700" onClick={onClearMove}>
          Move: {moveValue.name}
        </FilterPill>
      )}
    </div>
  );
}