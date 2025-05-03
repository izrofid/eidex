import { typeDataArray, getTypeName } from "../../utils/typeInfo";

interface TypeDropdownProps {
  value: number | undefined;
  onChange: (v: number | undefined) => void;
}

function TypeDropdown({ value, onChange }: TypeDropdownProps) {
  return (
    <div className="relative flex-1 min-w-32">
      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : undefined)
        }
        className="h-9 rounded-md w-full border-0 bg-gray-800 pl-3 pr-8 text-sm text-white focus:ring-1 focus:ring-blue-400"
      >
        <option value="">All</option>
        {typeDataArray.map((typeInfo) => (
          <option key={typeInfo.typeID} value={typeInfo.typeID}>
            {getTypeName(typeInfo.typeID)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TypeDropdown;