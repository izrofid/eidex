import { Command } from "cmdk";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import speciesData from "../../data/speciesData.json";
import abilityData from "../../data/abilityData.json";
import moveData from "../../data/moveData.json";
import { useModularFilterStore } from "../../stores/filterStore/index";
import { useUIStore } from "@/stores/uiStore";
import { IoMdRibbon } from "react-icons/io";
import { LuSword } from "react-icons/lu";
import { MdCatchingPokemon, MdKeyboardCommandKey } from "react-icons/md";
import { useRecentSearchesStore } from "@/stores/recentSearchStore";
import { RecentSearches } from "./RecentSearches";

// Types
interface SearchEntry {
  name: string;
  id: number;
  icon: React.ReactNode;
}

interface EntryType {
  label: string;
  color: string;
}

type DataSource = typeof speciesData | typeof abilityData | typeof moveData;

interface CommandItemsProps {
  entries: SearchEntry[];
  onSelect: (entry: SearchEntry) => void;
  entryType: EntryType;
}

const entryTypes: Record<string, EntryType> = {
  Pokemon: { label: "Pokemon", color: "#fb7185" },
  Ability: { label: "Ability", color: "#60A5FA" },
  Move: { label: "Move", color: "#34d399" },
};

const matchesPattern = (str: string, pattern: string): boolean => {
  let i = 0;
  for (let c of str) {
    if (c.toLowerCase() === pattern[i]?.toLowerCase()) {
      i++;
      if (i === pattern.length) return true;
    }
  }
  return false;
};

const CommandItems: React.FC<CommandItemsProps> = ({
  entries,
  onSelect,
  entryType,
}) => (
  <>
    {entries.map((entry) => (
      <Command.Item
        key={entry.id}
        value={entry.name}
        onSelect={() => onSelect(entry)}
        className="not-first:rounded flex cursor-pointer items-center justify-between rounded-b px-3 py-2 text-sm font-normal text-neutral-300 aria-selected:bg-zinc-700"
      >
        <span className="flex items-center gap-2">
          {entry.icon}
          <span>{entry.name}</span>
        </span>
        <span
          className="ml-4 text-xs font-normal text-zinc-500"
          style={{ color: entryType.color }}
        >
          {entryType.label}
        </span>
      </Command.Item>
    ))}
  </>
);

export const CommandMenu: React.FC = () => {
  const open = useUIStore((state) => state.isCmdOpen);
  const setOpen = useUIStore((state) => state.setCmdOpen);
  const [search, setSearch] = useState("");
  const containerElement = useRef<HTMLDivElement>(null);

  const { isCreditsOpen, isHelpOpen, isModalOpen } = useUIStore();
  const isSafeToOpen = !isCreditsOpen && !isHelpOpen && !isModalOpen;

  const setName = useModularFilterStore((state) => state.setName);
  const setAbility = useModularFilterStore((state) => state.setAbility);
  const setMove = useModularFilterStore((state) => state.setMoveValue);

  // Add recent searches store
  const addRecentSearch = useRecentSearchesStore((state) => state.addRecentSearch);


  const handleSelection = (entry: SearchEntry, type: 'Pokemon' | 'Ability' | 'Move') => {
    addRecentSearch({
      id: entry.id,
      name: entry.name,
      type: type,
    });

    // Handle the actual selection
    switch (type) {
      case 'Pokemon':
        setName(entry.name);
        break;
      case 'Ability':
        setAbility(entry.id);
        break;
      case 'Move':
        setMove({ id: entry.id, name: entry.name });
        break;
    }

    setOpen(false);
  };

  const handleRecentSelection = (item: { id: number; name: string; type: string }) => {
    switch (item.type) {
      case 'Pokemon':
        setName(item.name);
        break;
      case 'Ability':
        setAbility(item.id);
        break;
      case 'Move':
        setMove({ id: item.id, name: item.name });
        break;
    }
    setOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSafeToOpen && e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
        setSearch("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSafeToOpen, open, setOpen]);

  const getFilteredEntries = (
    data: DataSource,
    nameField: string,
    idField: string,
    icon?: React.ReactNode,
    slice:number = 15,
  ): SearchEntry[] => {
    return Object.values(data)
      .filter((p) => matchesPattern(p[nameField], search.trim()))
      .slice(0, slice)
      .map((p) => {
        const name = p[nameField];
        const id = p[idField];
        return {
          name,
          id,
          icon: icon ? icon : <FaSearch className="text-gray-500" />,
        };
      });
  };

  const pokemonEntries = useMemo(
    () => getFilteredEntries(speciesData, "nameKey", "speciesId", <MdCatchingPokemon />, 30),
    [search],
  );

  const abilityEntries = useMemo(
    () => getFilteredEntries(abilityData, "name", "abilityId", <IoMdRibbon />),
    [search],
  );

  const moveEntries = useMemo(
    () => getFilteredEntries(moveData, "name", "moveId", <LuSword/>),
    [search],
  );

  return (
    <>
      <div
        className="bg-filterbox/80 flex w-full cursor-text items-center justify-between gap-2 rounded-full px-3 py-2.5 text-sm text-zinc-400"
        onClick={() => {setOpen(true); setSearch("")}}
      >
        <span className="flex gap-2 items-center">
          <FaSearch />
          <span>{"Search for something..."}</span>
        </span>
        <span className="flex items-center gap-2 rounded-full bg-zinc-700 border-neutral-700 px-2 py-0.5">
          <span className="text-base font-semibold text-white drop-shadow"><MdKeyboardCommandKey /></span>
          <span className="text-sm font-semibold text-white drop-shadow">K</span>
        </span>
      </div>
      {open && (
        <Command.Dialog
          container={containerElement.current ?? undefined}
          open={open}
         onOpenChange={(isOpen) => {
            setOpen(isOpen);
            setSearch(""); // Clear search whenever dialog state changes
          }}
          label="Global Command Menu"
          className="fixed inset-0 z-40 flex items-start justify-center bg-black/50 p-4 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <div
            className="shadow-xl/40 flex max-h-[80dvh] w-full max-w-lg flex-col rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full">
              <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-zinc-500" />
              <Command.Input
                autoFocus
                className="w-full rounded-t-md border-b border-neutral-600 bg-zinc-800 py-3 pl-9 pr-3 text-sm text-gray-200"
                placeholder="Search for what you want…"
                value={search}
                onValueChange={setSearch}
              />
            </div>
            <Command.List className="flex-1 overflow-y-auto rounded-b-md bg-zinc-800">
              <Command.Empty className="py-2 px-3 text-sm text-zinc-500">
                No results found. Try adjusting your search.
              </Command.Empty>
              {!search.trim() && (
                <RecentSearches
                  onSelect={handleRecentSelection}
                  entryTypes={entryTypes}
                />
              )}
              <CommandItems
                entries={pokemonEntries}
                onSelect={(entry) => handleSelection(entry, 'Pokemon')}
                entryType={entryTypes.Pokemon}
              />
              <CommandItems
                entries={abilityEntries}
                onSelect={(entry) => handleSelection(entry, 'Ability')}
                entryType={entryTypes.Ability}
              />

              <CommandItems
                entries={moveEntries}
                onSelect={(entry) => handleSelection(entry, 'Move')}
                entryType={entryTypes.Move}
              />
            </Command.List>
          </div>
        </Command.Dialog>
      )}
    </>
  );
};
