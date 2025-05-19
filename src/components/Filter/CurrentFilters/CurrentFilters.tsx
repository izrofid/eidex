import { useEffect } from 'react';
import FilterPill from './FilterPill';

import { useFilterPillStore } from '../../../stores/filterPillStore';
import { useFilterStore } from '@/stores/filterStore';
import { Button } from '@headlessui/react';

function CurrentFilters() {
  const { 
    activePills, 
    syncWithFilters,
    removePill,
    clearAllPills 
  } = useFilterPillStore();

  const { filters } = useFilterStore();

  // Sync with filter state whenever the component renders
  useEffect(() => {
    syncWithFilters();
  }, [syncWithFilters, filters]);

  // Don't render if no active filters
  if (activePills.length === 0) return null;

  return (
    <div className="flex w-full flex-wrap gap-2 py-2">
      {activePills.map((pill) => (
        <FilterPill 
          key={pill.id} 
          pill={pill} 
          onRemove={removePill} 
        />
      ))}
      {activePills.length > 1 && (
        <Button
          onClick={clearAllPills}
          className="text-xs rounded-full bg-zinc-600 hover:bg-rose-500 px-3 py-1 text-white self-center"
        >
          Clear All
        </Button>
      )}
    </div>
  );
}

export default CurrentFilters;