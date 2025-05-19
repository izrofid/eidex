import GenericComboBox, { ComboBoxEntry } from "./GenericComboBox";
import speciesData from "../../../data/speciesData.json";
import { Pokemon } from "../../../types";
import { useMemo, useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { useFilterStore } from "../../../stores/filterStore";

const speciesIDMap: ComboBoxEntry[] = Object.values(speciesData)
  .filter((p) => typeof p === "object" && !!p && "nameKey" in p)
  .map((p) => ({
    id: (p as Pokemon).index,
    name: (p as Pokemon).nameKey,
  }));

function NameCombobox() {
  const nameValue = useFilterStore((state) => state.nameValue);
  const setNameValue = useFilterStore((state) => state.setNameValue);
  const [selectedEntry, setSelectedEntry] = useState<ComboBoxEntry | null>(null);
  const pokemonEntries: ComboBoxEntry[] = useMemo(() => speciesIDMap, []);

  const handleNameSelect = (entry: ComboBoxEntry | null) => {
    setSelectedEntry(entry);
    setNameValue(entry ? entry.name : "");
  };

  // Reset the component when nameValue is cleared
  useEffect(() => {
    if (!nameValue && selectedEntry) {
      setSelectedEntry(null);
    }
  }, [nameValue, selectedEntry]);

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