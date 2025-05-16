import { useFilterStore } from "../../../stores/filterStore";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { MdOutlineKeyboardArrowDown} from "react-icons/md";

function MoveSourceDropdown() {
  const moveSource = useFilterStore(state => state.moveSource);
  const setMoveSource = useFilterStore(state => state.setMoveSource);

  const options = [
    { id: "all", label: "All" },
    { id: "levelup", label: "Lvl" },
    { id: "tm", label: "TM" },
    { id: "egg", label: "Egg" },
  ];

  return (
    <Listbox value={moveSource} onChange={setMoveSource}>
      <div className="relative">
        <ListboxButton className="flex h-9 w-12 pl-3 items-center justify-between rounded-full bg-transparent text-sm text-white">
          {options.find(opt => opt.id === moveSource)?.label || "All"}
          <MdOutlineKeyboardArrowDown/>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom start"
          className="no-scrollbar w-(--button-width) rounded-md shadow-lg z-50 bg-zinc-800 ring-1 ring-gray-500 ring-opacity-5 [--anchor-gap:4px] focus:outline-none"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option.id}
              className="data-active:bg-gray-600 data-selected:font-bold data-selected:text-emerald-500 cursor-pointer select-none py-2 text-center text-sm text-white"
            >
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

export default MoveSourceDropdown;