import GenericComboBox, { ComboBoxEntry } from "./GenericComboBox";
import abilities from "../../../data/abilityData.json";
import { getAbilityName } from "../../../utils/abilityData";
import { useMemo } from "react";
import { useFilterStore } from "../../../stores/filterStore";

const abilityIDMap: ComboBoxEntry[] = Object.keys(abilities)
  .map((id) => {
    const numId = Number(id);
    return {
      id: numId,
      name: getAbilityName(numId),
    };
  })
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
        value={abilityValue}
      />
    </div>
  );
}

export default AbilityCombobox;
