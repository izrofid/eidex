
import moveData from "../../data/moveData.json";
import React, { useMemo, useState, useRef } from "react";
import { LuSword } from "react-icons/lu";
import { Move } from "../../types";
import { useModularFilterStore } from "@/stores/filterStore/index";
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/react";


type ComboBoxEntry = { id: number; name: string };

const moveIDMap: ComboBoxEntry[] = Object.values(moveData)
  .filter((m) => typeof m === "object" && !!m && "moveId" in m)
  .map((m) => ({
    id: (m as Move).moveId,
    name: (m as Move).name,
  }));


const MoveDexCombobox: React.FC = () => {
  const moveEntries: ComboBoxEntry[] = useMemo(() => moveIDMap, []);
  const setMoveValue = useModularFilterStore((state) => state.setMoveValue);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ComboBoxEntry | null>(null);

  const filteredMoves =
    query === ""
      ? moveEntries
      : moveEntries.filter((move) =>
          move.name.toLowerCase().includes(query.toLowerCase())
        );



  return (
    <Combobox
      value={selected}
      virtual={{ options: filteredMoves }}
      onChange={(val) => {
        setSelected(val);
        setMoveValue(val);
      }}
      onClose={() => setQuery("")}
    >
      <div className="relative w-full">
        <div className="relative flex items-center">
          <LuSword className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <ComboboxInput
            className="w-full rounded-full bg-zinc-700/90 py-2 pl-11 pr-4 text-zinc-100 placeholder:text-zinc-500 border border-zinc-600 shadow"
            displayValue={(move: ComboBoxEntry) => move?.name || ""}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pick a move..."
          />
        </div>
        <ComboboxOptions
          anchor="bottom start"
          className="w-(--input-width) mt-2 rounded-l-xl h-80 border border-zinc-700 bg-zinc-800/95 shadow-lg py-1 px-1 z-40"
        >
          {({ option: move }) => (
            <ComboboxOption
              value={move}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 cursor-pointer select-none text-white transition-colors data-active:bg-amber-600/20 data-selected:font-bold data-selected:text-amber-300"
            >
              {move.name}
            </ComboboxOption>
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};

export default MoveDexCombobox;
