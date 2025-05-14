import { IoCloseCircle } from "react-icons/io5";
import { FilterPill as FilterPillType } from "../../stores/filterPillStore";
import { getTypeName } from "../../utils/typeInfo";
import { capitalize } from "@/utils/miscUtils";

interface FilterPillProps {
  pill: FilterPillType;
  onRemove: (id: string) => void;
}

// Map of pill types to background colors
const bgColorMap: Record<string, string> = {
  name: "bg-emerald-700",
  type: "bg-blue-700",
  ability: "bg-purple-700",
  move: "bg-orange-700",
  stat: "bg-yellow-700",
  sort: "bg-pink-700",
};

function FilterPill({ pill, onRemove }: FilterPillProps) {
  // Get the appropriate background color for this pill type
  const bgColor = bgColorMap[pill.type] || "bg-neutral-700";

  // Format display value based on pill type
  const getDisplayValue = () => {
    // First check the pill type to determine which branch of the union we're in
    switch (pill.value.type) {
      case "name":
        return `Name: ${pill.value.value}`;
      case "type":
        return `Type: ${
          pill.value.value !== undefined ? getTypeName(pill.value.value) : "All"
        }`;
      case "ability":
        return `Ability: ${pill.value.value.name}`;
      case "stat": {
        const { stat, type, isMax } = pill.value.value;
        const statType = type ? capitalize(type) : "BST";
        const operator = isMax ? "≤" : "≥";
        return `${statType} ${operator} ${stat}`;
      }
      case "move": {
        const { name, source } = pill.value.value;
        const sourceMap: Record<string, string> = {
          tm: "TM",
          levelup: "Lvl",
          egg: "Egg",
          all: "",
        };
        const sourceLabel = sourceMap[source] ? `${sourceMap[source]} ` : "";
        return `${sourceLabel}Move: ${name}`;
      }
      default:
        return pill.label;
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-1 rounded-full ${bgColor} px-2 py-1 text-xs text-white`}
    >
      <span>{getDisplayValue()}</span>
      <IoCloseCircle
        className="cursor-pointer text-gray-300 hover:text-white"
        onClick={() => onRemove(pill.id)}
        size={16}
      />
    </div>
  );
}

export default FilterPill;
