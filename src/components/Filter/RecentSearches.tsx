import React from 'react';
import { Command } from 'cmdk';
import { MdCatchingPokemon } from 'react-icons/md';
import { IoMdRibbon } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { LuSword } from "react-icons/lu";
import { useRecentSearchesStore } from '../../stores/recentSearchStore';

interface RecentSearchesProps {
  onSelect: (item: { id: number; name: string; type: string }) => void;
  entryTypes: Record<string, { label: string; color: string }>;
}

const getIconForType = (type: string): React.ReactNode => {
  switch (type) {
    case 'Pokemon':
      return <MdCatchingPokemon />;
    case 'Ability':
      return <IoMdRibbon />;
    case 'Move':
      return <LuSword/>;
    default:
      return <FaSearch className="text-gray-500" />;
  }
};

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  onSelect,
  entryTypes,
}) => {
  const recentSearches = useRecentSearchesStore((state) => state.recentSearches);

  if (recentSearches.length === 0) return null;

  return (
    <Command.Group heading="Recent Searches" className="text-xs font-medium px-3 text-gray-300 py-2">
      {recentSearches.map((item) => (
        <Command.Item
          key={`${item.type}-${item.id}`}
          value={item.name}
          onSelect={() => onSelect(item)}
          className="flex cursor-pointer items-center first:mt-2 justify-between rounded px-3 py-2 text-sm font-normal text-neutral-300 aria-selected:bg-zinc-700"
        >
          <span className="flex items-center gap-2">
            {getIconForType(item.type)}
            <span>{item.name}</span>
          </span>
          <span
            className="ml-4 text-xs font-normal text-zinc-500"
            style={{ color: entryTypes[item.type]?.color }}
          >
            {entryTypes[item.type]?.label}
          </span>
        </Command.Item>
      ))}
    </Command.Group>
  );
};