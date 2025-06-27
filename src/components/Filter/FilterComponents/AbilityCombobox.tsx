import GenericComboBox, { ComboBoxEntry } from "./GenericComboBox";
import abilities from "../../../data/abilityData.json";
import { getAbilityName } from "../../../utils/abilityData";
import { useCallback, useMemo } from "react";
import { IoRibbon } from "react-icons/io5";
import { useModularFilterStore } from "@/stores/filterStore/index";

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
  const abilityId = useModularFilterStore((state) => state.filters.abilityId);
  const setAbility = useModularFilterStore((state) => state.setAbility);
  
  // Create abilityValue only when abilityId changes, not on every render
  const abilityValue = useMemo(() => 
    abilityId ? { id: abilityId, name: getAbilityName(abilityId) } : null
  , [abilityId]);
  
  const setAbilityValue = useCallback((entry: ComboBoxEntry | null) => 
    setAbility(entry?.id ?? 0)
  , [setAbility]);

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
