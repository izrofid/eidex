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
    nameValue,
    abilityValue,
    typeValue,
    moveValue, 
    moveSource,
    setNameValue,
    setAbilityValue,
    setTypeValue,
    setMoveValue,
    resetFilters
  } = useFilterStore();

  // State to force remount of NameCombobox for clearing
  const [nameComboKey, setNameComboKey] = useState(0);

  const handleNameSelect = (entry: ComboBoxEntry | null) => {
    setNameValue(entry ? entry.name : "");
  };

  const handleAbilitySelect = (entry: ComboBoxEntry | null) => {
    setAbilityValue(entry ? entry : null);
  };

  const handleTypeSelect = (typeId: number | undefined) => {
    setTypeValue(typeId);
  };

  // Add a handler to clear all filters
  const handleClearAllFilters = () => {
    resetFilters();
    setNameComboKey((k) => k + 1);
  };

  const handleMoveSelect = (entry: ComboBoxEntry | null) => setMoveValue(entry ? entry : null);

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-lg bg-neutral-900/90 px-3 py-2 shadow-lg">
        <NameCombobox key={nameComboKey} onSelect={handleNameSelect} />
        <Button
                className="flex h-9 items-center gap-2 rounded-md bg-neutral-700 px-3 text-gray-200 hover:text-emerald-400 active:text-emerald-600"
                onClick={handleClearAllFilters}
              >
                <BsFillEraserFill />
              </Button>
        <FilterModal />
      </div>
      <div
        className={`px-3 ${
          !nameValue &&
          typeValue === undefined &&
          !abilityValue &&
          !moveValue
            ? "hidden"
            : ""
        }`}
      >
        <CurrentFilters
          name={nameValue}
          onClearName={() => {
            handleNameSelect(null);
            setNameComboKey((k) => k + 1);
          }}
          typeId={typeValue}
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