import { SortBy } from "@/types";
import { Field, Label, Radio, RadioGroup, Switch } from "@headlessui/react";
import { BiSort } from "react-icons/bi";
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
  descending?: boolean;
  onDirectionChange?: (descending: boolean) => void;
}

export const SortBar: React.FC<SortBarProps> = ({
  sortBy,
  statType,
  onChange,
  descending = false,
  onDirectionChange,
}) => {
  const selected = statType ? `${sortBy}:${statType}` : sortBy;

  return (
    <div className="flex w-full items-center justify-between bg-neutral-900/60">
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
        className="mt-1 flex w-full text-nowrap border-transparent pt-2 text-sm justify-evenly"
        aria-label="List sort"
      >
        {sortOptions.map((option) => {
          const value = option.statType
            ? `${option.value}:${option.statType}`
            : option.value;
          return (
            <Field className="w-6 text-xs sm:text-base md:text-lg sm:w-10 md:w-14" key={option.label}>
              <Radio
                value={value}
                className="data-checked:border-b-emerald-400 data-checked:border-b-4 flex w-full select-none items-center justify-center border-b-4 border-transparent text-center text-gray-200 transition-colors"
              >
                <Label className="font-pixel w-full cursor-pointer text-center">
                  {option.label}
                </Label>
              </Radio>
            </Field>
          );
        })}
      </RadioGroup>
      {/* Ascending/Descending toggle using Headless UI Switch */}
      <div className="px-3 flex items-center pt-2 mb-1">
        <span className="mr-1 text-gray-200">
          <BiSort size={16} />
        </span>

        <Switch
          checked={descending}
          onChange={onDirectionChange}
          className="data-checked:bg-emerald-500 group inline-flex h-5 w-10 items-center rounded-full bg-gray-500 transition"
        >
          <span className="group-data-checked:translate-x-6 size-3 translate-x-1 rounded-full bg-white transition" />
        </Switch>
      </div>
    </div>
  );
};
