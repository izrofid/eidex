import { useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaSliders } from "react-icons/fa6";
import CurrentFilters from "./CurrentFilters";
import TypeDropdown from "./TypeDropdown";
import AbilityCombobox from "./AbilityCombobox";
import MoveFilterGroup from "./MoveFilterGroup";
import StatFilter from "./StatFilter";
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
        className="flex h-9 items-center gap-2 rounded-md bg-neutral-700 px-3 text-gray-200 hover:text-emerald-400  active:text-emerald-600"
        onClick={() => setIsOpen(true)}
      >
        <FaSliders />
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 select-none">
          <DialogPanel className="w-full max-w-xl rounded-lg bg-zinc-900 p-4 border-1 border-gray-400/40">
            <DialogTitle className="pb-2 text-xl font-bold text-gray-200">
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
