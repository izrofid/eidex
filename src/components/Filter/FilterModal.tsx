import { useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaSliders } from "react-icons/fa6";
import CurrentFilters from "./CurrentFilters/CurrentFilters";
import TypeDropdown from "./FilterComponents/TypeDropdown";
import AbilityCombobox from "./FilterComponents/AbilityCombobox";
import MoveFilterGroup from "./FilterComponents/MoveFilterGroup";
import StatFilter from "./StatFilter/StatFilter";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import { useFilterStore } from "../../stores/filterStore";

function FilterModal() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    resetFilters,
  } = useFilterStore();

  useBodyScrollLock(isOpen);

  return (
    <>
      <Button
        className="text-gray-200 hover:text-emerald-400 active:text-emerald-600 focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <FaSliders size={20} />
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex select-none justify-start">
          <DialogPanel className="w-[90%] sm:max-w-3xl bg-zinc-900 px-5 transition-discrete">
            <DialogTitle className="pt-4 pb-3 text-xl font-bold text-gray-200">
              Filter Options
            </DialogTitle>
            <div className="flex flex-wrap gap-2">
              <div className="flex-1 min-w-max"><TypeDropdown /></div>
              <div className="flex-1 min-w-max"><AbilityCombobox /></div>
              <div className="flex-1 min-w-max"><MoveFilterGroup /></div>
              <div className="flex-1 min-w-max"><StatFilter /></div>
            </div>
            <div className="flex my-2"><CurrentFilters/></div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsOpen(false)}
                className="shadow-md/60 text-sm/2 h-7 w-16 cursor-pointer rounded bg-emerald-700 p-2 text-center text-white"
              >
                Apply
              </Button>
              <Button
                onClick={() => {
                  resetFilters();
                  setIsOpen(false);
                }}
                className="shadow-md/60 text-sm/2 h-7 w-16 cursor-pointer rounded bg-rose-700 p-2 text-center text-white"
              >
                Reset
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default FilterModal;
