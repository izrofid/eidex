import { statType } from "@/stores/filterStore/constants";
import { useModularFilterStore } from "@/stores/filterStore/index";
import { RadioGroup, Radio } from "@headlessui/react";
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";

const statOptions = [
  { value: statType.BST, label: "BST" },
  { value: statType.HP, label: "HP" },
  { value: statType.ATK, label: "Atk" },
  { value: statType.DEF, label: "Def" },
  { value: statType.SPA, label: "SpA" },
  { value: statType.SPD, label: "SpD" },
  { value: statType.SPE, label: "Spe" },
];

export default function StatSelector() {
  const statTypeValue = useModularFilterStore((state) => state.statType);
  const setStatType = useModularFilterStore((state) => state.setStatType);
  const isStatMax = useModularFilterStore((state) => state.isStatMax);
  const toggleStatMax = useModularFilterStore((state) => state.setStatMax);

  const colorScheme = isStatMax ? "group-data-checked:text-rose-400 group-data-checked:border-b-rose-400" : "group-data-checked:text-emerald-400 group-data-checked:border-b-emerald-400";
  return (
    <div className="border-1 flex h-max min-h-8 min-w-max flex-1 justify-between gap-0 rounded-md overflow-hidden border-gray-200 select-none">
      <RadioGroup
        value={statTypeValue || ""}
        onChange={setStatType}
        className="flex flex-row overflow-hidden"
      >
        {statOptions.map((option) => (
          <Radio
            key={option.value || "bst"}
            value={option.value}
            className={`group flex cursor-pointer items-center px-1 text-sm text-gray-200`}
          >
            <span className={`group-data-checked:font-bold group-data-checked:border-b-1 ${colorScheme}`}>
              {option.label}
            </span>
          </Radio>
        ))}
      </RadioGroup>
      <div
        className="text-black-200 flex bg-gray-200 items-center px-1 cursor-pointer"
        onClick={() => toggleStatMax(!isStatMax)}
      >
        {isStatMax ? (
          <FaCircleChevronLeft/>
        ) : (
          <FaCircleChevronRight />
        )}
      </div>
    </div>
  );
}
