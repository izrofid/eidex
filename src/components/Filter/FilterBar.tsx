import { FilterOptions } from "../../types";
import NameCombobox from "./NameCombobox";
import { ComboBoxEntry } from "./GenericComboBox";
import FilterMenu from "./FilterMenu";
import abilities from "../../data/abilityData.json";
import { getAbilityName } from "../../utils/abilityData";
import { MoveSource } from "../../types";
import { BsFillEraserFill } from "react-icons/bs";
import { useState } from "react";
import CurrentFilters from "./CurrentFilters";

type FilterBarProps = {
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  filters: FilterOptions;
};

function FilterBar({ setFilters, filters }: FilterBarProps) {
  const handleNameSelect = (entry: ComboBoxEntry | null) => {
    setFilters((prev) => ({
      ...prev,
      name: entry ? entry.name : "",
    }));
  };

  const handleAbilitySelect = (entry: ComboBoxEntry | null) => {
    setFilters((prev) => ({
      ...prev,
      abilityId: entry ? entry.id : undefined,
    }));
  };

  const handleTypeSelect = (typeId: number | undefined) => {
    setFilters((prev) => ({
      ...prev,
      typeId,
    }));
  };

  // State to force remount of NameCombobox for clearing
  const [nameComboKey, setNameComboKey] = useState(0);

  // Add a handler to clear all filters (matches FilterMenu's handleClearFilters)
  const handleClearAllFilters = () => {
    setFilters((prev) => ({
      ...prev,
      name: "",
      typeId: undefined,
      abilityId: undefined,
      moveId: undefined,
      moveName: undefined,
      moveSource: "all",
    }));
    setNameComboKey((k) => k + 1);
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
    setFilters((prev) => ({ ...prev, moveSource: source }));
  };
  const handleMoveSelect = (entry: ComboBoxEntry | null) => {
    setFilters((prev) => ({
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

  // Add handlers for statType and isStatMax
  const handleStatTypeChange = (type: string | undefined) => {
    setFilters((prev) => ({ ...prev, statType: type }));
  };
  const handleStatMaxChange = (isMax: boolean) => {
    setFilters((prev) => ({ ...prev, isStatMax: isMax }));
  };

  // Add handler for chosenStat
  const handleChosenStatChange = (stat: number | undefined) => {
    setFilters((prev) => ({ ...prev, chosenStat: stat }));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-lg bg-neutral-900/90 px-3 py-2 shadow-lg">
        <NameCombobox key={nameComboKey} onSelect={handleNameSelect} />
        <span
          className="cursor-pointer rounded-sm p-1 text-white hover:bg-neutral-600/80"
          onClick={handleClearAllFilters}
          title="Clear all filters"
        >
          <BsFillEraserFill size={20} />
        </span>
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
          onNameClear={() => {
            handleNameSelect(null);
            setNameComboKey((k) => k + 1);
          }}
          onStatTypeChange={handleStatTypeChange}
          statType={filters.statType}
          isMaxStat={filters.isStatMax ?? false}
          onStatMaxChange={handleStatMaxChange}
          onChosenStatChange={handleChosenStatChange}
        />
      </div>
      <div
        className={`px-3 ${
          !filters.name &&
          filters.typeId === undefined &&
          !abilityValue &&
          !moveValue
            ? "hidden"
            : ""
        }`}
      >
        <CurrentFilters
          name={filters.name}
          onClearName={() => {
            handleNameSelect(null);
            setNameComboKey((k) => k + 1);
          }}
          typeId={filters.typeId}
          onClearType={() => handleTypeSelect(undefined)}
          abilityValue={abilityValue}
          onClearAbility={() => handleAbilitySelect(null)}
          moveSource={moveSource}
          moveValue={moveValue}
          onClearMove={() => handleMoveSelect(null)}
        />
      </div>
    </div>
  );
}

export default FilterBar;
