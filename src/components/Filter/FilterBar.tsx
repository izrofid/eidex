import { FilterOptions } from "../../types";
import AbilityDropdown from './AbilityDropdown';
import NameDropdown from './NameDropdown';
import TypeDropdown from './TypeDropdown';
import StatFilter from './StatFilter';
import MoveFilterGroup from './MoveFilterGroup';

type FilterBarProps = {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

function FilterBar({ filters, setFilters }: FilterBarProps) {
  const moveSource = filters.moveSource || "all";

  function handleMoveChange(move: string) {
    setFilters((prev) => {
      if (moveSource === "levelup") {
        return {
          ...prev,
          levelupMove: move,
          tmMove: "",
          tutorMove: "",
          moveName: move,
        };
      }
      if (moveSource === "tm") {
        return {
          ...prev,
          levelupMove: "",
          tmMove: move,
          tutorMove: "",
          moveName: move,
        };
      }
      if (moveSource === "tutor") {
        return {
          ...prev,
          levelupMove: "",
          tmMove: "",
          tutorMove: move,
          moveName: move,
        };
      }
      // "all"
      return {
        ...prev,
        levelupMove: move,
        tmMove: move,
        tutorMove: move,
        moveName: move,
      };
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-lg bg-gray-900/90 px-3 py-2 shadow-lg">
      <NameDropdown
        value={filters.name || ""}
        onChange={(name) => setFilters((prev) => ({ ...prev, name }))}
      />
      <TypeDropdown
        value={filters.typeId}
        onChange={(typeId) => setFilters((prev) => ({ ...prev, typeId }))}
      />
      <AbilityDropdown
        value={filters.ability || ""}
        onChange={(ability) => setFilters((prev) => ({ ...prev, ability }))}
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
      <MoveFilterGroup
        moveSource={moveSource}
        onMoveSourceChange={(src) =>
          setFilters((prev) => ({ ...prev, moveSource: src }))
        }
        moveName={filters.moveName || ""}
        onMoveNameChange={handleMoveChange}
      />
    </div>
  );
}

export default FilterBar;