import { useFilterStore } from "../../stores/filterStore";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { MdOutlineKeyboardArrowDown, MdCheck } from "react-icons/md";

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
        <ListboxButton className="flex h-9 items-center justify-between gap-1 rounded-md border-0 bg-neutral-800 px-2 text-sm text-white">
          {options.find(opt => opt.id === moveSource)?.label || "All"}
          <MdOutlineKeyboardArrowDown size={18} />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom start"
          className="no-scrollbar w-(--button-width) rounded-md bg-neutral-800 shadow-lg ring-1 ring-gray-500 ring-opacity-5 [--anchor-gap:4px] focus:outline-none"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option.id}
              className="data-active:bg-blue-600 data-selected:font-bold group flex cursor-pointer select-none flex-row justify-between py-2 pl-4 pr-4 text-sm text-white"
            >
              {option.label}
              <span className="group-data-selected:block hidden">
                <MdCheck />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

export default MoveSourceDropdown;