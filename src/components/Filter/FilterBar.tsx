import { FilterOptions } from "../../types";
import TypeDropdown from "./TypeDropdown";
import StatFilter from "./StatFilter";
import MoveFilterGroup from "./MoveFilterGroup";
import NameCombobox from "./NameCombobox";
import { ComboBoxEntry } from "./GenericComboBox";
import AbilityCombobox from "./AbilityCombobox";

type FilterBarProps = {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

function FilterBar({ filters, setFilters }: FilterBarProps) {
  const moveSource = filters.moveSource || "all";

  function handleMoveChange(entry: ComboBoxEntry | null) {
    setFilters((prev) => ({
      ...prev,
      moveId: entry ? entry.id : undefined, // Set moveId for filtering
      moveName: entry ? entry.name : "",    // (Optional) Keep moveName for display
    }));
  }

  const handleNameSelect = (entry: ComboBoxEntry | null) => {
    setFilters((prev) => ({
      ...prev,
      name: entry ? entry.name : "", // Use the selected name
    }));
  };

  const handleAbilitySelect = (entry: ComboBoxEntry | null) => {
    setFilters((prev) => ({
      ...prev,
      abilityId: entry ? entry.id : undefined, // Use the selected ability
    }));
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-lg bg-gray-900/90 px-3 py-2 shadow-lg">

      <NameCombobox onSelect={handleNameSelect} />
      <TypeDropdown
        value={filters.typeId}
        onChange={(typeId) => setFilters((prev) => ({ ...prev, typeId }))}
      />
      <StatFilter
        minStat={filters.minStat}
        statType={filters.statType}
        onMinStatChange={(minStat) =>
          setFilters((prev) => ({ ...prev, minStat }))
        }
        onStatTypeChange={(statType) =>
          setFilters((prev) => ({ ...prev, statType }))
        }
      />
      <AbilityCombobox onSelect={handleAbilitySelect} />
      <MoveFilterGroup 
        moveSource={moveSource}
        onMoveSourceChange={(source) => setFilters((prev) => ({ ...prev, moveSource: source }))}
        handleMoveSelect={handleMoveChange}
        
      />
    </div>
  );
}

export default FilterBar;
