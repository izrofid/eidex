import { useMemo } from "react";
import FilterPill from "./FilterPill";
import { useModularFilterStore } from "@/stores/filterStore/index";
import { Button } from "@headlessui/react";
import { getFilterPillsFromFilters } from "@/utils/filterPillUtils/filters/getFilterPills";
import { removeFilterPill } from "@/utils/filterPillUtils/filters/removeFilterPill";

function CurrentFilters() {
  const filters = useModularFilterStore((state) => state.filters);
  const resetFilters = useModularFilterStore((state) => state.resetFilters);

  // Derive pills directly from filters
  const activePills = useMemo(
    () => getFilterPillsFromFilters(filters),
    [filters],
  );

  const handleRemovePill = (id: string) => {
    const pillToRemove = activePills.find((pill) => pill.id === id);
    if (pillToRemove) {
      removeFilterPill(pillToRemove);
    } else {
      console.warn(`Pill with id ${id} not found.`);
    }
    console.log(`Remove pill: ${id}`);
  };

  const handleClearAll = () => {
    resetFilters();
  };

  if (activePills.length === 0) return null;

  return (
    <div className="flex w-full flex-wrap gap-2 py-2">
      {activePills.map((pill) => (
        <FilterPill key={pill.id} pill={pill} onRemove={handleRemovePill} />
      ))}
      {activePills.length > 1 && (
        <Button
          onClick={(handleClearAll)}
          className="cursor-pointer self-center rounded-full px-3 py-1 text-xs text-white hover:bg-rose-500"
        >
          Clear All
        </Button>
      )}
    </div>
  );
}

export default CurrentFilters;
