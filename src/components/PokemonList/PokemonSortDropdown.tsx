import { SortBy } from "@/stores/filterStore/types";
import { statType, sortOptions } from "@/stores/filterStore/constants";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";

type StatTypeKey = keyof typeof statType;

interface PokemonSortDropwdownProps {
  sortBy: SortBy;
  sortStat?: keyof typeof statType;
  onChange: (sortBy: SortBy, statType: StatTypeKey) => void;
}

const PokemonSortDropdown: React.FC<PokemonSortDropwdownProps> = ({
  sortBy,
  sortStat = "BST",
  onChange,
}) => {
  return (
    <Listbox
      value={sortBy}
      onChange={(value) => onChange(value, sortStat as StatTypeKey)}
    >
      <ListboxButton className="h-7 w-20 rounded-md bg-neutral-800 px-2 text-left text-sm text-gray-200 shadow-sm hover:bg-neutral-700 flex items-center justify-between">
      {sortOptions.find((option) => option.value === sortBy)?.label ||
        "Sort"}
      <span className="ml-2">
        <BiChevronDown size={18}/>
      </span>
      </ListboxButton>
      <ListboxOptions
      className="w-(--button-width) no-scrollbar z-10 mt-1 rounded-sm bg-neutral-800 text-sm text-white [--anchor-gap:1px]"
      anchor="bottom start"
      >
      {sortOptions.map((option) => (
        <ListboxOption
        key={option.value}
        value={option.value}
        className="data-focus:bg-neutral-700 data-focus:text-white cursor-pointer select-none px-3 py-2 text-gray-300"
        >
        {option.label}
        </ListboxOption>
      ))}
      </ListboxOptions>
    </Listbox>
  );
};

export default PokemonSortDropdown;
