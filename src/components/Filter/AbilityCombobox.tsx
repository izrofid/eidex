import GenericComboBox, { ComboBoxEntry } from "./GenericComboBox";
import { abilities } from "../../utils/abilityData";
import { useMemo } from "react";
import { IoRibbon } from "react-icons/io5";


const abilityIDMap: ComboBoxEntry[] = Object.entries(abilities)
  .filter((a) => typeof a[1] === "object" && !!a[1] && "names" in a[1])
  .map(([id, ability]) => ({
    id: Number(id),
    name: ability.names[0],
  }));

type ComboBoxDemoProps = {
  onSelect: (entry: ComboBoxEntry | null) => void;
};

function AbilityCombobox({ onSelect }: ComboBoxDemoProps) {
  const abilityEntries: ComboBoxEntry[] = useMemo(() => abilityIDMap, []);

  return (
    <GenericComboBox
      entries={abilityEntries}
      onSelect={onSelect}
      placeholder="Select an ability..."
      icon={<IoRibbon />}
    />
  );
}

export default AbilityCombobox;
