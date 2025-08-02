import { ShadcnGenericCombobox } from "./ShadcnCombobox";
import { ComboBoxEntry } from "./GenericComboBox";
import abilities from "../../../data/abilityData.json";
import { getAbilityName } from "../../../utils/abilityData";
import { useMemo, useCallback } from "react";
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

  const abilityEntries: ComboBoxEntry[] = useMemo(() => abilityIDMap, []);
  const selectedEntry =
    !abilityId
      ? null
      : abilityEntries.find((entry) => entry.id === abilityId) || { id: null, name: getAbilityName(abilityId) };

  const handleAbilitySelect = useCallback((entry: ComboBoxEntry | null) => {
    setAbility(entry?.id ?? 0);
  }, [setAbility]);

  return (
    <div className="w-full">
      <ShadcnGenericCombobox
        entries={abilityEntries}
        onSelect={handleAbilitySelect}
        placeholder="Select an ability..."
        value={selectedEntry}
        isControlled={true}
        showQuery={false}
      />
    </div>
  );
}

export default AbilityCombobox;