import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { getTypeName } from "../../utils/typeInfo";
import { MdCheck, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useFilterStore } from "../../stores/filterStore";

function TypeDropdown() {
  const setTypeValue = useFilterStore((state) => state.setTypeValue);
  const options = useFilterStore((state) => state.typeOptions);
  const selected = useFilterStore((state) => state.getSelectedType());

  return (
    <Listbox value={selected} onChange={(t) => setTypeValue(t.typeID)}>
      <div className="relative min-w-32 flex-1">
        <ListboxButton className="flex h-9 w-full flex-row items-center justify-between rounded-md border-0 bg-neutral-800 pl-2 pr-1 text-left text-sm text-white">
          {selected.typeID === undefined ? "All" : getTypeName(selected.typeID)}
          <MdOutlineKeyboardArrowDown size={18} />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom start"
          className="no-scrollbar w-(--button-width) rounded-md bg-neutral-900 shadow-lg ring-1 ring-gray-500 ring-opacity-5 [--anchor-gap:4px] focus:outline-none"
        >
          {options.map((typeInfo) => (
            <ListboxOption
              key={typeInfo.typeID ?? "all"}
              value={typeInfo}
              className="data-active:bg-blue-600 data-selected:font-bold group flex cursor-pointer select-none flex-row justify-between py-2 pl-4 pr-4 text-sm text-white"
            >
              {typeInfo.typeID === undefined
                ? "All"
                : getTypeName(typeInfo.typeID)}
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

export default TypeDropdown;
