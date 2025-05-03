import { useMemo } from "react";
import FilterableDropdown from "./FilterableDropdown";
import speciesData from "../../data/speciesData.json"; 
import { Pokemon } from "../../types";

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

export default NameDropdown