import { useMemo } from "react";
import { abilities } from "../../utils/abilityData";
import FilterableDropdown from "./FilterableDropdown";

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

export default AbilityDropdown;