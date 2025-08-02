import { ShadcnGenericCombobox } from "./ShadcnCombobox";
import type { ComboBoxEntry } from "./GenericComboBox";
import itemData from "../../../data/itemData.json";
import { useMemo } from "react";
import { useModularFilterStore } from "@/stores/filterStore/index";

const speciesIDMap: ComboBoxEntry[] = Object.values(itemData)
  .filter((i) => typeof i === "object" && !!i && "itemId" in i)
  .map((i) => ({
    id: i.itemId,
    name: i.Name,
  }));

function ItemCombobox() {
  const heldItem = useModularFilterStore((state) => state.filters.heldItem);
  const setHeldItem = useModularFilterStore((state) => state.setHeldItem);
  const itemEntries: ComboBoxEntry[] = useMemo(() => speciesIDMap, []);

  // Find the entry matching the current heldItem, or use {id: null, name} if not found and heldItem is set
  const selectedEntry =
    !heldItem
      ? null
      : itemEntries.find((entry) => entry.id === heldItem) || { id: null, name: String(heldItem) };

  const handleItemSelect = (entry: ComboBoxEntry | null) => {
    setHeldItem(entry?.id ?? 0);
  };

  return (
    <ShadcnGenericCombobox
      entries={itemEntries}
      onSelect={handleItemSelect}
      placeholder="Choose an item..."
      value={selectedEntry}
      isControlled={true}
      showQuery={false}
    />
  );
}

export default ItemCombobox;
