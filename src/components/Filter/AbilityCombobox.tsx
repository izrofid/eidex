import GenericComboBox, { ComboBoxEntry } from "./GenericComboBox";
import abilities from "../../data/abilityData.json";
import { getAbilityName } from "../../utils/abilityData";
import { useMemo } from "react";
import { IoRibbon } from "react-icons/io5";
import { useFilterStore } from "../../stores/filterStore";

const abilityIDMap: ComboBoxEntry[] = abilities
  .map((ability) => ({
    id: ability.id,
    name: getAbilityName(ability.id),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

function AbilityCombobox() {
  const abilityValue = useFilterStore((state) => state.abilityValue);
  const setAbilityValue = useFilterStore((state) => state.setAbilityValue);

  const abilityEntries: ComboBoxEntry[] = useMemo(() => abilityIDMap, []);

  return (
    <div className="w-full">
      <GenericComboBox
        entries={abilityEntries}
        onSelect={setAbilityValue}
        placeholder="Select an ability..."
        icon={<IoRibbon />}
        value={abilityValue}
      />
    </div>
  );
}

export default AbilityCombobox;
