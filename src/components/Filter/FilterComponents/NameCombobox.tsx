import { ShadcnGenericCombobox } from "./ShadcnCombobox";
import speciesData from "../../../data/speciesData.json";
import { Pokemon } from "../../../types";
import { useMemo } from "react";
import { useModularFilterStore } from "../../../stores/filterStore/index";
import { ComboBoxEntry } from "./GenericComboBox";

const speciesIDMap: ComboBoxEntry[] = Object.values(speciesData)
  .filter((p) => typeof p === "object" && !!p && "nameKey" in p)
  .map((p) => ({
    id: (p as Pokemon).speciesId,
    name: (p as Pokemon).nameKey,
  }));

function NameCombobox() {
  const name = useModularFilterStore((state) => state.filters.name);
  const setName = useModularFilterStore((state) => state.setName);
  const pokemonEntries: ComboBoxEntry[] = useMemo(() => speciesIDMap, []);

  // Find the entry matching the current name, or use {id: null, name} if not found and name is set
  const selectedEntry =
    name === ""
      ? null
      : pokemonEntries.find((entry) => entry.name === name) || { id: null, name: "" };

  const handleNameSelect = (entry: ComboBoxEntry | null) => {
    setName(entry ? entry.name : "");
  };

  return (
    <ShadcnGenericCombobox
      entries={pokemonEntries}
      onSelect={handleNameSelect}
      placeholder="Pick a pokemon..."
      value={selectedEntry}
      isControlled={true}
      showQuery={true}
      className="flex-initial"
    />
  );
}

export default NameCombobox;