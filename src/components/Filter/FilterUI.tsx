import { typeDataArray, getTypeName } from "../../utils/typeInfo";
import { FilterOptions, Move, Pokemon } from "../../types";
import { useState, useMemo, useEffect, useRef } from "react";
import moveData from "../../data/moveData.json";
import speciesData from "../../data/speciesData.json"; 
import { abilities } from "../../utils/abilityData";


// interface SearchInputProps {
//   value: string;
//   onChange: (v: string) => void;
//   placeholder: string;
//   icon: React.ReactNode;
// }

interface TypeDropdownProps {
  value: number | undefined;
  onChange: (v: number | undefined) => void;
}

type FilterBarProps = {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

// function SearchInput({ value, onChange, placeholder, icon }: SearchInputProps) {
//   return (
//     <div className="relative flex-1 h-9 min-w-32">
//       {icon}
//       <input
//         type="text"
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="h-9 w-full rounded-md border-0 bg-gray-800 pl-8 pr-3 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-blue-400"
//       />
//     </div>
//   );
// }

function FilterableDropdown({
  value,
  onChange,
  placeholder,
  options,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
  icon?: React.ReactNode;
}) {
  const [input, setInput] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setInput(value || "");
  }, [value]);

  const filteredOptions = useMemo(() => {
    if (!input) return options;
    return options.filter((opt) =>
      opt.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, options]);

  useEffect(() => {
    setHighlighted(filteredOptions.length > 0 ? 0 : -1);
  }, [filteredOptions, open]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || filteredOptions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => (h + 1) % filteredOptions.length);
      scrollToHighlighted((highlighted + 1) % filteredOptions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) =>
        h <= 0 ? filteredOptions.length - 1 : h - 1
      );
      scrollToHighlighted(
        highlighted <= 0 ? filteredOptions.length - 1 : highlighted - 1
      );
    } else if (e.key === "Enter" && highlighted >= 0) {
      e.preventDefault();
      const selected = filteredOptions[highlighted];
      setInput(selected);
      onChange(selected);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function scrollToHighlighted(idx: number) {
    if (!ulRef.current) return;
    const li = ulRef.current.children[idx] as HTMLElement | undefined;
    if (li) li.scrollIntoView({ block: "nearest" });
  }

  return (
    <div className="relative flex-1 min-w-32">
      {icon}
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => {
          const val = e.target.value;
          setInput(val);
          setOpen(true);
          if (val === "") {
            onChange(""); // Call onChange immediately when cleared
          } else if (
            !options.some((opt) =>
              opt.toLowerCase().includes(val.toLowerCase())
            )
          ) {
            onChange(val); // Call onChange with non-matching input
          }
          // Otherwise, only call onChange when user selects from dropdown
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        onKeyDown={handleKeyDown}
        className="h-9 w-full rounded-md border-0 bg-gray-800 pl-8 pr-8 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-blue-400"
        autoComplete="off"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="dropdown-list"
      />
      {input && (
        <button
          type="button"
          className="absolute right-2 top-2 text-gray-400 hover:text-white text-lg leading-none"
          tabIndex={-1}
          onMouseDown={e => {
            e.preventDefault();
            setInput("");
            onChange("");
          }}
          aria-label="Clear"
        >
          ×
        </button>
      )}
      {open && (
        <ul
          ref={ulRef}
          id="dropdown-list"
          className="no-scrollbar absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 border border-gray-700"
          role="listbox"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.slice(0, 30).map((opt, idx) => (
              <li
                key={opt}
                role="option"
                aria-selected={highlighted === idx}
                className={
                  "cursor-pointer px-3 py-1 text-sm " +
                  (highlighted === idx
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-blue-600")
                }
                onMouseDown={() => {
                  setInput(opt);
                  onChange(opt);
                  setOpen(false);
                }}
                onMouseEnter={() => setHighlighted(idx)}
              >
                {opt}
              </li>
            ))
          ) : input ? (
            <li className="px-3 py-1 text-sm text-gray-400 select-none">No results</li>
          ) : null}
        </ul>
      )}
    </div>
  );
}

function NameDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
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
  const pokemonNames = useMemo(
    () =>
      Object.values(speciesData)
        .filter((p) => typeof p === "object" && !!p && "nameKey" in p)
        .map((p) => (p as Pokemon).nameKey)
        .filter(Boolean),
    []
  );
  return (
    <FilterableDropdown
      value={value}
      onChange={onChange}
      placeholder="Search Pokémon"
      options={pokemonNames}
      icon={searchIcon}
    />
  );
}

// Usage for abilities
function AbilityDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
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
  // Fix: get all unique ability names from the abilities object
  const abilityNames = useMemo(() => {
    const names: string[] = [];
    Object.values(abilities).forEach((a) => {
      a.names.forEach((n) => {
        if (!names.includes(n)) names.push(n);
      });
    });
    return names;
  }, []);
  return (
    <FilterableDropdown
      value={value}
      onChange={onChange}
      placeholder="Ability"
      options={abilityNames}
      icon={abilityIcon}
    />
  );
}

// function NameSearchInput({
//   value,
//   onChange,
// }: Omit<SearchInputProps, "placeholder" | "icon">) {
//   const searchIcon = (
//     <svg
//       xmlns="https://www.w3.org/2000/svg"
//       className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//       />
//     </svg>
//   );

//   return (
//     <SearchInput
//       value={value}
//       onChange={onChange}
//       placeholder="Search Pokémon"
//       icon={searchIcon}
//     />
//   );
// }

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

type MoveSource = "all" | "levelup" | "tm" | "tutor";

function MoveSourceDropdown({
  value,
  onChange,
}: {
  value: MoveSource;
  onChange: (v: MoveSource) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as MoveSource)}
      className="h-9 w-24 rounded-md border-0 bg-gray-800 pl-2 pr-6 text-sm text-white focus:ring-1 focus:ring-blue-400"
    >
      <option value="all">All</option>
      <option value="levelup">Lvl</option>
      <option value="tm">TM</option>
      <option value="tutor">Tutor</option>
    </select>
  );
}

function MoveDropdown({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState(value || "");
  const [open, setOpen] = useState(false);

  // Flatten all moves into an array and filter as user types
  const allMoves = useMemo(() => {
    return Object.values(moveData) as Move[];
  }, []);

  const filteredMoves = useMemo(() => {
    if (!input) return allMoves;
    return allMoves.filter((move) =>
      move.name.toLowerCase().includes(input.toLowerCase()),
    );
  }, [input, allMoves]);

  return (
    <div className="relative w-full min-w-48 flex-1">
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
          onChange(e.target.value);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        className="h-9 w-full rounded-md border-0 bg-gray-800 pl-3 pr-3 text-sm text-white placeholder-gray-500"
        autoComplete="off"
      />
      {open && filteredMoves.length > 0 && (
        <ul className="no-scrollbar absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5">
          {filteredMoves.slice(0, 30).map((move) => (
            <li
              key={move.ID}
              className="cursor-pointer px-3 py-1 text-sm text-white hover:bg-blue-600"
              onMouseDown={() => {
                setInput(move.name);
                onChange(move.name);
                setOpen(false);
              }}
            >
              {move.name}
            </li>
          ))}
        </ul>
      )}
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
    <div className="group flex flex-1 items-center h-9 justify-evenly rounded-md bg-gray-800 focus-within:ring-1 focus-within:ring-blue-400">
      <input
        type="number"
        placeholder="Min"
        value={minStat ?? ""}
        onChange={(e) =>
          onMinStatChange(e.target.value ? Number(e.target.value) : undefined)
        }
        className="h-9 border-0 w-10 bg-transparent pl-2 text-sm text-white focus:outline-none focus:ring-0"
      />
      <div className="flex h-9 items-center px-1">
        <span className="text-xs text-gray-400">in</span>
      </div>
      <div className="relative">
        <select
          value={statType || "bst"}
          onChange={(e) => onStatTypeChange(e.target.value)}
          className="h-9 appearance-none border-0 bg-gray-800 pl-2 pr-6 text-sm text-white focus:outline-none focus:ring-0"
        >
          <option value="">BST</option>
          <option value="hp">HP</option>
          <option value="attack">Atk</option>
          <option value="defense">Def</option>
          <option value="spAtk">SpA</option>
          <option value="spDef">SpD</option>
          <option value="speed">Spe</option>
        </select>
      </div>
    </div>
  );
}

// function AbilitySearchInput({
//   value,
//   onChange,
// }: Omit<SearchInputProps, "placeholder" | "icon">) {
//   const abilityIcon = (
//     <svg
//       xmlns="https://www.w3.org/2000/svg"
//       className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
//       fill="none"
//       viewBox="0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
//       />
//     </svg>
//   );

//   return (
//     <SearchInput
//       value={value}
//       onChange={onChange}
//       placeholder="Ability"
//       icon={abilityIcon}
//     />
//   );
// }

function MoveFilterGroup({
  moveSource,
  onMoveSourceChange,
  moveName,
  onMoveNameChange,
}: {
  moveSource: MoveSource;
  onMoveSourceChange: (v: MoveSource) => void;
  moveName: string;
  onMoveNameChange: (v: string) => void;
}) {
  return (
    <div className="flex h-9 flex-1 items-center gap-2 rounded-md bg-gray-800 px-2 py-1 focus-within:ring-1 focus-within:ring-blue-400">
      <MoveSourceDropdown value={moveSource} onChange={onMoveSourceChange} />
      <MoveDropdown
        value={moveName}
        onChange={onMoveNameChange}
        placeholder="Move Name"
      />
    </div>
  );
}

export function FilterBar({ filters, setFilters }: FilterBarProps) {
  const moveSource = filters.moveSource || "all";

  function handleMoveChange(move: string) {
    setFilters((prev) => {
      if (moveSource === "levelup") {
        return {
          ...prev,
          levelupMove: move,
          tmMove: "",
          tutorMove: "",
          moveName: move,
        };
      }
      if (moveSource === "tm") {
        return {
          ...prev,
          levelupMove: "",
          tmMove: move,
          tutorMove: "",
          moveName: move,
        };
      }
      if (moveSource === "tutor") {
        return {
          ...prev,
          levelupMove: "",
          tmMove: "",
          tutorMove: move,
          moveName: move,
        };
      }
      // "all"
      return {
        ...prev,
        levelupMove: move,
        tmMove: move,
        tutorMove: move,
        moveName: move,
      };
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-lg bg-gray-900/90 px-3 py-2 shadow-lg">
      <NameDropdown
        value={filters.name || ""}
        onChange={(name) => setFilters((prev) => ({ ...prev, name }))}
      />
      <TypeDropdown
        value={filters.typeId}
        onChange={(typeId) => setFilters((prev) => ({ ...prev, typeId }))}
      />
      <AbilityDropdown
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
      <MoveFilterGroup
        moveSource={moveSource}
        onMoveSourceChange={(src) =>
          setFilters((prev) => ({ ...prev, moveSource: src }))
        }
        moveName={filters.moveName || ""}
        onMoveNameChange={handleMoveChange}
      />
    </div>
  );
}
