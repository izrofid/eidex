import GenericComboBox, { ComboBoxEntry } from "./GenericComboBox";
import speciesData from "../../../data/speciesData.json";
import { Pokemon } from "../../../types";
import { useMemo, useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { useModularFilterStore } from "../../../stores/filterStore/index";

const speciesIDMap: ComboBoxEntry[] = Object.values(speciesData)
  .filter((p) => typeof p === "object" && !!p && "nameKey" in p)
  .map((p) => ({
    id: (p as Pokemon).speciesId,
    name: (p as Pokemon).nameKey,
  }));

function NameCombobox() {
  const name = useModularFilterStore((state) => state.filters.name);
  const setName = useModularFilterStore((state) => state.setName);
  const [selectedEntry, setSelectedEntry] = useState<ComboBoxEntry | null>(null);
  const pokemonEntries: ComboBoxEntry[] = useMemo(() => speciesIDMap, []);

  const handleNameSelect = (entry: ComboBoxEntry | null) => {
    setSelectedEntry(entry);
    setName(entry ? entry.name : "");
  };

  // Reset the component when nameValue is cleared
  useEffect(() => {
    if (!name && selectedEntry) {
      setSelectedEntry(null);
    }
  }, [name, selectedEntry]);

  return (
    <GenericComboBox
      entries={pokemonEntries}
      onSelect={handleNameSelect}
      placeholder="Pick a pokemon..."
      icon={<MdSearch />}
      value={selectedEntry}
    />
  );
}

export default NameCombobox;