import GenericComboBox, { ComboBoxEntry } from "./GenericComboBox";
import abilities from "../../data/abilityData.json";
import { getAbilityName } from "../../utils/abilityData";
import { useMemo } from "react";
import { IoRibbon } from "react-icons/io5";

const abilityIDMap: ComboBoxEntry[] = abilities
  .map((ability) => ({
    id: ability.id,
    name: getAbilityName(ability.id),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

type AbilityComboboxProps = {
  onSelect: (entry: ComboBoxEntry | null) => void;
  value?: ComboBoxEntry | null;
};

function AbilityCombobox({ onSelect, value }: AbilityComboboxProps) {
  const abilityEntries: ComboBoxEntry[] = useMemo(() => abilityIDMap, []);
  return (
    <GenericComboBox
      entries={abilityEntries}
      onSelect={onSelect}
      placeholder="Select an ability..."
      icon={<IoRibbon />}
      value={value ?? null}
    />
  );
}

export default AbilityCombobox;
