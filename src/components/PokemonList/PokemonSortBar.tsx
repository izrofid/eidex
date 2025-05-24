import { SortBy } from "@/types";
import { PiSortAscending } from "react-icons/pi";
import { PiSortDescending } from "react-icons/pi";
import { Button } from "@headlessui/react";
import React from "react";
import { useFilterStore } from "@/stores/filterStore";

const sortOptions: {
  label: string;
  value: SortBy;
  statType?: string;
  defaultDescending: boolean;
}[] = [
  { label: "#", value: "dexId", defaultDescending: false },
  { label: "Name", value: "name", defaultDescending: false },
  { label: "HP", value: "stat", statType: "hp", defaultDescending: true },
  { label: "Atk", value: "stat", statType: "attack", defaultDescending: true },
  { label: "Def", value: "stat", statType: "defense", defaultDescending: true },
  { label: "SpA", value: "stat", statType: "spAtk", defaultDescending: true },
  { label: "SpD", value: "stat", statType: "spDef", defaultDescending: true },
  { label: "Spe", value: "stat", statType: "speed", defaultDescending: true },
  { label: "BST", value: "stat", statType: "bst", defaultDescending: true },
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
  const descending = useFilterStore((state) => state.descending);
  const toggleSortDirection = useFilterStore(
    (state) => state.toggleSortDirection,
  );
  const setSortDirection = useFilterStore((state) => state.setSortDirection);

  return (
    <div className="border-b-1 flex w-full items-center justify-between border-neutral-600/50 bg-zinc-900 px-3">
      {/* Sort buttons group */}
      <div className="flex h-11 flex-1 text-nowrap overflow-x-auto">
        {sortOptions.map((option) => {
          const value = option.statType
            ? `${option.value}:${option.statType}`
            : option.value;
          const isSelected = selected === value;
          return (
            <Button
              key={option.label}
              data-selected={isSelected && !descending}
              data-descending={isSelected && descending}
              className="min-w-max border-b-4 border-transparent px-2 text-xs font-bold text-gray-300 data-[selected=true]:border-emerald-500 data-[descending=true]:border-rose-500 data-[descending=true]:text-rose-500 data-[selected=true]:text-emerald-500 sm:text-sm cursor-pointer"
              onClick={() => {
                if (isSelected) {
                  toggleSortDirection?.();
                } else {
                  onChange(option.value, option.statType);
                  if(descending !== option.defaultDescending)
                  {
                    setSortDirection?.(option.defaultDescending);
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
        className="cursor-pointer select-none p-1 max-sm:bg-zinc-700"
        onClick={() => {
          if (toggleSortDirection) {
            toggleSortDirection();
          }
        }}
      >
        {descending ? (
          <PiSortAscending size={24} className="text-rose-500" />
        ) : (
          <PiSortDescending size={24} className="text-emerald-500" />
        )}
      </div>
    </div>
  );
};
