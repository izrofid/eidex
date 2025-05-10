import GenericComboBox, { ComboBoxEntry } from "./GenericComboBox";
import speciesData from "../../data/speciesData.json";
import { Pokemon } from "../../types";
import { useMemo } from "react";
import { MdSearch } from "react-icons/md";

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
  const pokemonEntries: ComboBoxEntry[] = useMemo(() => speciesIDMap, []);

  return (
      <GenericComboBox
        entries={pokemonEntries}
        onSelect={onSelect}
        placeholder="Pick a pokemon..."
        icon = {<MdSearch/>}
      />
  );
}

export default NameCombobox;
