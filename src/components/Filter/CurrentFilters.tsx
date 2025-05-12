import FilterPill from "./FilterPill";
import { getTypeName } from "../../utils/typeInfo";
import { ComboBoxEntry } from "./GenericComboBox";
import { MoveSource } from "@/types";

type CurrentFiltersProps = {
  name?: string;
  onClearName?: () => void;
  typeId?: number;
  onClearType?: () => void;
  abilityValue?: ComboBoxEntry | null;
  onClearAbility?: () => void;
  moveSource?: MoveSource;
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
  moveSource,
  moveValue,
  onClearMove,
}: CurrentFiltersProps) {


  const moveLabelMap: Record<string, string> = {
    tm: "TM",
    levelup: "Lvl",
    egg: "Egg",
    all: "All",
  };

  const movePillLabel: string = moveSource && moveLabelMap[moveSource]
    ? `${moveLabelMap[moveSource]} Move`
    : "Move";

  return (
    <div className="my-2 flex flex-wrap gap-2">
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
          {movePillLabel}: {moveValue.name}
        </FilterPill>
      )}
    </div>
  );
}
