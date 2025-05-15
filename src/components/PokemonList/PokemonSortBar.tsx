import { SortBy } from "@/types";
import { PiSortAscending } from "react-icons/pi";
import { PiSortDescending } from "react-icons/pi";
import { Button } from "@headlessui/react";
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
    <div className="flex w-full items-center justify-between bg-neutral-900/90">
      {/* Sort buttons group */}
      <div className="ml-3 flex h-9 flex-1 text-nowrap">
        {sortOptions.map((option) => {
          const value = option.statType
            ? `${option.value}:${option.statType}`
            : option.value;
          const isSelected = selected === value;
          return (
            <Button
              key={option.label}
              data-selected={isSelected}
              className="min-w-max px-2 text-xs font-medium text-gray-300 border-b-4 border-transparent data-[selected=true]:border-emerald-500 data-[selected=true]:text-emerald-500"
              onClick={() => {
                if (isSelected) {
                  if (onDirectionChange) onDirectionChange(!descending);
                } else {
                  if (option.statType) {
                    onChange(option.value, option.statType);
                  } else {
                    onChange(option.value);
                  }
                }
              }}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
      {/* Direction marker */}
      <div
        className="cursor-pointer select-none pr-3 text-emerald-300"
        onClick={() => {
          if (onDirectionChange) {
            onDirectionChange(!descending);
          }
        }}
      >
        {descending ? (
          <PiSortAscending size={22} />
        ) : (
          <PiSortDescending size={22} />
        )}
      </div>
    </div>
  );
};
