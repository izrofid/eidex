import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { IoChevronUpCircle, IoChevronDownCircle } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function StatFilter({
  chosenStat,
  statType,
  isMaxStat,
  onToggleStatMax,
  onChosenStatChange,
  onStatTypeChange,
}: {
  chosenStat: number | undefined;
  statType: string | undefined;
  isMaxStat: boolean;
  onToggleStatMax?: () => void;
  onChosenStatChange: (v: number | undefined) => void;
  onStatTypeChange: (v: string | undefined) => void;
}) {
  const statOptions = [
    { value: "", label: "BST" },
    { value: "hp", label: "HP" },
    { value: "attack", label: "Atk" },
    { value: "defense", label: "Def" },
    { value: "spAtk", label: "SpA" },
    { value: "spDef", label: "SpD" },
    { value: "speed", label: "Spe" },
  ];
  const selected =
    statOptions.find((o) => (statType || "") === o.value) || statOptions[0];

  return (
    <div className="flex h-9 flex-1 items-center justify-between gap-2 rounded-md bg-neutral-800 px-2">
      <input
        type="number"
        placeholder="Min"
        value={chosenStat ?? ""}
        onChange={(e) =>
          onChosenStatChange(
            e.target.value ? Number(e.target.value) : undefined,
          )
        }
        className="h-8 w-14 rounded-md border-0 bg-transparent px-2 text-sm text-white focus:outline-none focus:ring-0"
      />
      <span className="mx-1 text-xs text-gray-400">in</span>
      <div className="">
        <Listbox value={selected} onChange={(o) => onStatTypeChange(o.value)}>
          <ListboxButton className="flex h-9 flex-row items-center rounded-md border-0 bg-neutral-800 px-2 text-sm text-white">
            {selected.label}
            <MdOutlineKeyboardArrowDown className="ml-1" size={18} />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom start"
            className="w-(--button-width) rounded-md bg-neutral-800 shadow-lg ring-1 ring-gray-500 ring-opacity-5 focus:outline-none"
          >
            {statOptions.map((option) => (
              <ListboxOption
                key={option.value || "bst"}
                value={option}
                className="data-active:bg-emerald-600 data-selected:font-bold flex cursor-pointer select-none flex-row px-4 py-2 text-center text-sm text-white"
              >
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
      <span
        className={isMaxStat ? "text-emerald-400" : "text-red-400"}
        onClick={onToggleStatMax}
      >
        {isMaxStat ? (
          <IoChevronUpCircle size={20} />
        ) : (
          <IoChevronDownCircle size={20} />
        )}
      </span>
    </div>
  );
}

export default StatFilter;
