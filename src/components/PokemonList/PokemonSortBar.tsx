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
    <div className="flex w-full items-center justify-between bg-neutral-900/90 pt-2">
      {/* Sort buttons group */}
      <div className="flex items-center gap-2 text-nowrap text-sm">
        {sortOptions.map((option) => {
          const value = option.statType
            ? `${option.value}:${option.statType}`
            : option.value;
          const isSelected = selected === value;
          return (
            <Button
              key={option.label}
              data-selected={isSelected}
              className="font-pixel md:text-md border-b-3 flex w-7 cursor-pointer items-center justify-center border-transparent text-center text-xs text-gray-300 data-[selected=true]:border-emerald-400 md:w-10 md:gap-2 md:text-sm lg:text-lg"
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
        className="text-emerald-300 pr-1 select-none cursor-pointer"
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
