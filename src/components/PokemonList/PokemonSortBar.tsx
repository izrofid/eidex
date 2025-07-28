import { sortOptions } from "@/stores/filterStore/constants";
import { PiSortAscending } from "react-icons/pi";
import { PiSortDescending } from "react-icons/pi";
import { Button } from "@headlessui/react";
import React from "react";
import { useModularFilterStore } from "@/stores/filterStore/index";

export const SortBar: React.FC = () => {
  const sortBy = useModularFilterStore((state) => state.sortBy);
  const sortStat = useModularFilterStore((state) => state.sortStat);
  const isDescending = useModularFilterStore((state) => state.isDescending);
  const setSortBy = useModularFilterStore((state) => state.setSortBy);
  const setSortStat = useModularFilterStore((state) => state.setSortStat);
  const setIsDescending = useModularFilterStore(
    (state) => state.setIsDescending,
  );

  const toggleSortDirection = () => setIsDescending(!isDescending);

  return (
    <div className="border-b-1 flex w-full items-center justify-between border-neutral-600/50 bg-zinc-900">
      {/* Sort buttons group */}
      <div className="2xs:gap-2 2xs:justify-start mx-3 flex h-11 flex-1 justify-evenly text-nowrap">
        {sortOptions.map((option) => {
          const isSelected =
            option.value === "stat"
              ? sortBy === "stat" && sortStat === option.statType
              : sortBy === option.value;

          return (
            <Button
              key={option.label}
              data-selected={isSelected && !isDescending}
              data-descending={isSelected && isDescending}
              className="2xs:font-bold xs:text-sm min-w-max cursor-pointer border-b-4 border-transparent px-1 text-xs font-medium text-gray-300 data-[descending=true]:border-rose-500 data-[selected=true]:border-emerald-500 data-[descending=true]:text-rose-500 data-[selected=true]:text-emerald-500"
              onClick={() => {
                if (isSelected) {
                  toggleSortDirection();
                } else {
                  setSortBy(option.value);
                  if (option.value === "stat" && option.statType) {
                    setSortStat(option.statType);
                  }
                  setIsDescending(option.defaultDescending);
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
        className="2xs:inline-block hidden cursor-pointer select-none pr-3"
        onClick={toggleSortDirection}
      >
        {isDescending ? (
          <PiSortAscending size={24} className="text-rose-500" />
        ) : (
          <PiSortDescending size={24} className="text-emerald-500" />
        )}
      </div>
    </div>
  );
};
