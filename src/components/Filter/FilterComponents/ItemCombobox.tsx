import GenericComboBox, { ComboBoxEntry } from "./GenericComboBox";
import itemData from "../../../data/itemData.json";
import { useMemo, useState, useEffect, useCallback } from "react";
import { MdShoppingBag} from "react-icons/md";
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
  const [selectedEntry, setSelectedEntry] = useState<ComboBoxEntry | null>(
    null,
  );
  const itemEntries: ComboBoxEntry[] = useMemo(() => speciesIDMap, []);

  const handleItemSelect = useCallback((entry: ComboBoxEntry | null) => {
    setSelectedEntry(entry);
    setHeldItem(entry ? entry.id : 0);
  }, [setHeldItem]);

  // Reset the component when nameValue is cleared
  useEffect(() => {
    if (!heldItem && selectedEntry) {
      setSelectedEntry(null);
    }
  }, [heldItem, selectedEntry]);

  return (
    <GenericComboBox
      entries={itemEntries}
      onSelect={handleItemSelect}
      placeholder="Choose an item..."
      icon={<MdShoppingBag />}
      value={selectedEntry}
    />
  );
}

export default ItemCombobox;
