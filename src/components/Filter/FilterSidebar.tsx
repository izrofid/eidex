import { Button } from "@headlessui/react";
import { FaSliders } from "react-icons/fa6";
import CurrentFilters from "./CurrentFilters/CurrentFilters";
import TypeDropdown from "./FilterComponents/TypeDropdown";
import AbilityCombobox from "./FilterComponents/AbilityCombobox";
import MoveFilterGroup from "./FilterComponents/MoveFilterGroup";
import StatFilter from "./StatFilter/StatFilter";
import { useFilterStore } from "../../stores/filterStore";

function FilterSidebar() {
  const { resetFilters } = useFilterStore();

  return (
    <aside className="w-full h-screen bg-zinc-900 px-5 py-6 flex flex-col border-r border-neutral-800">
      <div className="flex items-center gap-2 mb-4">
        <FaSliders size={20} className="text-emerald-400" />
        <span className="text-xl font-bold text-gray-200">Filter Options</span>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <TypeDropdown />
        <AbilityCombobox />
        <MoveFilterGroup />
        <StatFilter />
      </div>
      <div className="my-3">
        <CurrentFilters />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Button
          onClick={resetFilters}
          className="shadow-md/60 text-sm/2 h-7 w-16 cursor-pointer rounded bg-rose-700 p-2 text-center text-white"
        >
          Reset
        </Button>
      </div>
    </aside>
  );
}

export default FilterSidebar;
