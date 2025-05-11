import { SortBy } from "@/types";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import React from "react";

const sortOptions: { label: string; value: SortBy; statType?: string }[] = [
  { label: "ID", value: "dexId" },
  { label: "Name", value: "name" },
  { label: "BST", value: "stat", statType: "bst" },
  { label: "HP", value: "stat", statType: "hp" },
  { label: "Atk", value: "stat", statType: "attack" },
  { label: "Def", value: "stat", statType: "defense" },
  { label: "SpA", value: "stat", statType: "spAtk" },
  { label: "SpD", value: "stat", statType: "spDef" },
  { label: "Spe", value: "stat", statType: "speed" },
];

interface SortBarProps {
  sortBy: SortBy;
  statType?: string;
  onChange: (sortBy: SortBy, statType?: string) => void;
}

export const SortBar: React.FC<SortBarProps> = ({
  sortBy,
  statType,
  onChange,
}) => {
  const selected = statType ? `${sortBy}:${statType}` : sortBy;

  return (
    <div className="w-full">
      <RadioGroup
        value={selected}
        onChange={(val) => {
          if (val.includes(":")) {
            const [sortBy, statType] = val.split(":");
            onChange(sortBy as SortBy, statType);
          } else {
            onChange(val as SortBy, undefined);
          }
        }}
        className="flex w-max text-nowrap bg-neutral-900/60 border-transparent pt-2 mt-1 text-sm"
        aria-label="List sort"
      >
        {sortOptions.map((option) => {
          const value = option.statType
            ? `${option.value}:${option.statType}`
            : option.value;
          return (
            <Field className="w-13" key={option.label}>
              <Radio
                value={value}
                className="data-checked:border-b-emerald-400 border-y-4 border-transparent flex select-none text-gray-200 transition-colors"
              >
                <Label className="w-full font-pixel text-center cursor-pointer">{option.label}</Label>
              </Radio>
            </Field>
          );
        })}
      </RadioGroup>
    </div>
  );
};
