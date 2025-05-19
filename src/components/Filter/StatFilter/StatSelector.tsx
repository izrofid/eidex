import { RadioGroup, Radio } from "@headlessui/react";
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";

interface StatSelectorProps {
  statType: string | undefined;
  setStatType: (type: string | undefined) => void;
  statOptions: { value: string; label: string }[];
  toggleStatMax: () => void;
  isStatMax: boolean;
}

export default function StatSelector(props: StatSelectorProps) {
  const { statType, setStatType, statOptions, toggleStatMax, isStatMax } =
    props;

  const colorScheme = isStatMax ? "group-data-checked:text-rose-400 group-data-checked:border-b-rose-400" : "group-data-checked:text-emerald-400 group-data-checked:border-b-emerald-400"
  return (
    <div className="border-1 flex h-max min-h-8 min-w-max flex-1 justify-between gap-0 rounded-md overflow-hidden border-gray-200 select-none">
      <RadioGroup
        value={statType || ""}
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
        onClick={toggleStatMax}
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
