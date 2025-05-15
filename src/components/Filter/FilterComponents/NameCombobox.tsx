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

  type ComboBoxDemoProps = {
    onSelect: (entry: ComboBoxEntry | null) => void;
  };

function NameCombobox({onSelect}: ComboBoxDemoProps) {
  const nameValue = useFilterStore(state => state.nameValue);
  const [selectedEntry, setSelectedEntry] = useState<ComboBoxEntry | null>(null);
  const pokemonEntries: ComboBoxEntry[] = useMemo(() => speciesIDMap, []);
  
  // Reset the component when nameValue is cleared
  useEffect(() => {
    if (!nameValue && selectedEntry) {
      setSelectedEntry(null);
    }
  }, [nameValue, selectedEntry]);

  // Custom wrapper around onSelect that also updates our local state
  const handleSelect = (entry: ComboBoxEntry | null) => {
    setSelectedEntry(entry);
    onSelect(entry);
  };

  return (
      <GenericComboBox
        entries={pokemonEntries}
        onSelect={handleSelect}
        placeholder="Pick a pokemon..."
        icon={<MdSearch/>}
        value={selectedEntry}
      />
  );
}

export default NameCombobox;
