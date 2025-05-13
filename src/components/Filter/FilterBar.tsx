import NameCombobox from "./NameCombobox";
import { ComboBoxEntry } from "./GenericComboBox";
import FilterModal from "./FilterModal";
import { BsFillEraserFill } from "react-icons/bs";
import { useState } from "react";
import CurrentFilters from "./CurrentFilters";
import { useFilterStore } from "@/stores/filterStore";
import { Button } from "@headlessui/react";

function FilterBar() {
  // Use the filter store directly
  const {
    setNameValue,
    resetFilters,
  } = useFilterStore();

  // State to force remount of NameCombobox for clearing
  const [nameComboKey, setNameComboKey] = useState(0);

  const handleNameSelect = (entry: ComboBoxEntry | null) => {
    setNameValue(entry ? entry.name : "");
  };

  // Add a handler to clear all filters
  const handleClearAllFilters = () => {
    resetFilters();
    setNameComboKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 items-center justify-between gap-3 rounded-t-lg bg-neutral-900/90 px-3 py-2 shadow-lg">
        <NameCombobox key={nameComboKey} onSelect={handleNameSelect} />
        <Button
          className="flex h-9 items-center gap-2 rounded-md bg-neutral-700 px-3 text-gray-200 hover:text-emerald-400 active:text-emerald-600"
          onClick={handleClearAllFilters}
        >
          <BsFillEraserFill />
        </Button>
        <FilterModal />
      </div>
      <div className="px-3">
        <CurrentFilters />
      </div>
    </div>
  );
}

export default FilterBar;
