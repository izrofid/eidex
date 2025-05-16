import NameCombobox from "./FilterComponents/NameCombobox";
import { ComboBoxEntry } from "./FilterComponents/GenericComboBox";
import FilterModal from "./FilterModal";
import CurrentFilters from "./CurrentFilters/CurrentFilters";
import { useFilterStore } from "@/stores/filterStore";

function FilterBar() {
  // Use the filter store directly
  const {
    setNameValue,
  } = useFilterStore();

  // State to force remount of NameCombobox for clearing

  const handleNameSelect = (entry: ComboBoxEntry | null) => {
    setNameValue(entry ? entry.name : "");
  };



  return (
    <div className="select-none">
      <div className="flex flex-1 items-center justify-between gap-3 rounded-t-lg bg-neutral-900/90 px-3 py-2 shadow-lg">
        <NameCombobox onSelect={handleNameSelect} />
        <FilterModal />
      </div>
      <div className="px-3 bg-gray-600/20 shadow-x-md">
        <CurrentFilters />
      </div>
    </div>
  );
};

export default FilterBar;
