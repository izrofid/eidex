import { FilterOptions } from "../../types";
import NameCombobox from "./NameCombobox";
import { ComboBoxEntry } from "./GenericComboBox";
import FilterMenu from "./FilterMenu";
import abilities from "../../data/abilityData.json";
import { getAbilityName } from "../../utils/abilityData";
import { MoveSource } from "../../types";

type FilterBarProps = {
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  filters: FilterOptions;
};

function FilterBar({ setFilters, filters }: FilterBarProps) {
  const handleNameSelect = (entry: ComboBoxEntry | null) => {
    setFilters(prev => ({
      ...prev,
      name: entry ? entry.name : "",
    }));
  };

  const handleAbilitySelect = (entry: ComboBoxEntry | null) => {
    setFilters(prev => ({
      ...prev,
      abilityId: entry ? entry.id : undefined,
    }));
  };

  const handleTypeSelect = (typeId: number | undefined) => {
    setFilters(prev => ({
      ...prev,
      typeId,
    }));
  };

  // Find the current ability ComboBoxEntry from abilityId, using the same reference as AbilityCombobox
  const abilityId = filters.abilityId;
  const abilityValue = abilityId
    ? abilities
        .map((a) => ({ id: a.id, name: getAbilityName(a.id) }))
        .find((entry) => entry.id === abilityId) || null
    : null;

  // Move filter state and handlers
  const moveSource = (filters.moveSource as MoveSource) || "all";
  const handleMoveSourceChange = (source: MoveSource) => {
    setFilters(prev => ({ ...prev, moveSource: source }));
  };
  const handleMoveSelect = (entry: ComboBoxEntry | null) => {
    setFilters(prev => ({
      ...prev,
      moveId: entry ? entry.id : undefined,
      moveName: entry ? entry.name : undefined,
    }));
  };

  // Derive moveValue from filters.moveId and filters.moveName
  const moveValue: ComboBoxEntry | null =
    filters.moveId && filters.moveName
      ? { id: filters.moveId, name: filters.moveName }
      : null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-lg bg-neutral-900/90 px-3 py-2 shadow-lg">
      <NameCombobox onSelect={handleNameSelect} />
      <FilterMenu
        onAbilitySelect={handleAbilitySelect}
        onTypeSelect={handleTypeSelect}
        typeValue={filters.typeId}
        abilityValue={abilityValue}
        nameValue={filters.name ?? ""}
        moveSource={moveSource}
        onMoveSourceChange={handleMoveSourceChange}
        onMoveSelect={handleMoveSelect}
        moveValue={moveValue}
      />
    </div>
  );
}

export default FilterBar;
