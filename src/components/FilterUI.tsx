import { typeDataArray, getTypeName} from "../utils/typeInfo";
import { FilterOptions } from "../types";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ReactNode;
}

interface TypeDropdownProps {
  value: number | undefined;
  onChange: (v: number | undefined) => void;
}

type FilterBarProps = {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

function SearchInput({ value, onChange, placeholder, icon }: SearchInputProps) {
  return (
    <div className="relative">
      {icon}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-48 rounded-md border-0 bg-gray-800 pl-8 pr-3 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-blue-400"
      />
    </div>
  );
}

function NameSearchInput({ value, onChange }: Omit<SearchInputProps, 'placeholder' | 'icon'>) {
  const searchIcon = (
    <svg
      xmlns="https://www.w3.org/2000/svg"
      className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
  
  return (
    <SearchInput
      value={value}
      onChange={onChange}
      placeholder="Search Pokémon"
      icon={searchIcon}
    />
  );
}

function TypeDropdown({
  value,
  onChange,
}: TypeDropdownProps) {
  return (
    <div className="relative">
      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : undefined)
        }
        className="h-9 w-32 appearance-none rounded-md border-0 bg-gray-800 pl-3 pr-8 text-sm text-white focus:ring-1 focus:ring-blue-400"
      >
        <option value="">All</option>
        {typeDataArray.map((typeInfo) => (
          <option 
            key={typeInfo.typeID} 
            value={typeInfo.typeID}
          >
            {getTypeName(typeInfo.typeID)}
          </option>
        ))}
      </select>
      <svg
        xmlns="https://www.w3.org/2000/svg"
        className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}

function StatFilter({
  minStat,
  statType,
  onMinStatChange,
  onStatTypeChange,
}: {
  minStat: number | undefined;
  statType: string | undefined;
  onMinStatChange: (v: number | undefined) => void;
  onStatTypeChange: (v: string) => void;
}) {
  return (
    <div className="group flex items-center overflow-hidden rounded-md bg-gray-800 focus-within:ring-1 focus-within:ring-blue-400">
      <input
        type="number"
        placeholder="Min"
        value={minStat ?? ""}
        onChange={(e) =>
          onMinStatChange(e.target.value ? Number(e.target.value) : undefined)
        }
        className="h-8 w-16 border-0 bg-transparent pl-2 text-sm text-white focus:outline-none focus:ring-0"
      />
      <div className="flex h-8 items-center px-1">
        <span className="text-xs text-gray-400">in</span>
      </div>
      <div className="relative">
        <select
          value={statType || "bst"}
          onChange={(e) => onStatTypeChange(e.target.value)}
          className="h-8 w-20 appearance-none border-0 bg-gray-800 pl-2 pr-6 text-sm text-white focus:outline-none focus:ring-0"
        >
          <option value="">BST</option>
          <option value="hp">HP</option>
          <option value="attack">Atk</option>
          <option value="defense">Def</option>
          <option value="spAtk">SpA</option>
          <option value="spDef">SpD</option>
          <option value="speed">Spe</option>
        </select>
        <svg
          xmlns="https://www.w3.org/2000/svg"
          className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

function AbilitySearchInput({
  value,
  onChange,
}: Omit<SearchInputProps, 'placeholder' | 'icon'>) {
  const abilityIcon = (
    <svg
      xmlns="https://www.w3.org/2000/svg"
      className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  );

  return (
    <SearchInput
      value={value}
      onChange={onChange}
      placeholder="Ability"
      icon={abilityIcon}
    />
  );
}

export function FilterBar({ filters, setFilters }: FilterBarProps) {
  return (
    <div className="flex w-full flex-wrap items-center justify-evenly gap-3 rounded-t-lg bg-gray-900/90 px-3 py-2 shadow-lg">
      <NameSearchInput
        value={filters.name || ""}
        onChange={(name) => setFilters((prev) => ({ ...prev, name }))}
      />
      <TypeDropdown
        value={filters.typeId}
        onChange={(typeId) => setFilters((prev) => ({ ...prev, typeId }))}
      />
      <AbilitySearchInput
        value={filters.ability || ""}
        onChange={(ability) => setFilters((prev) => ({ ...prev, ability }))}
      />
      <StatFilter
        minStat={filters.minStat}
        statType={filters.statType}
        onMinStatChange={(minStat) =>
          setFilters((prev) => ({ ...prev, minStat }))
        }
        onStatTypeChange={(statType) =>
          setFilters((prev) => ({ ...prev, statType }))
        }
      />
    </div>
  );
}
