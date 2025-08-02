import { useMemo } from "react";
import moveData from "../../../data/moveData.json";
import { Move } from "../../../types";
import { useModularFilterStore } from "@/stores/filterStore/index";
import { ShadcnGenericCombobox } from "./ShadcnCombobox";
import type { ComboBoxEntry } from "./GenericComboBox";

const moveIDMap: ComboBoxEntry[] = Object.values(moveData)
  .filter((m) => typeof m === "object" && !!m && "moveId" in m)
  .map((m) => ({
    id: (m as Move).moveId,
    name: (m as Move).name,
  }));

function MoveCombobox() {
  const setMoveValue = useModularFilterStore((state) => state.setMoveValue);
  const moveEntries: ComboBoxEntry[] = useMemo(() => moveIDMap, []);

  // Find the entry matching the current move, or use {id: null, name} if not found and move is set

  const handleMoveSelect = (entry: ComboBoxEntry | null) => {
    setMoveValue(entry);
  };

  return (
    <ShadcnGenericCombobox
      entries={moveEntries}
      onSelect={handleMoveSelect}
      placeholder="Pick a move..."
      isControlled={true}
      showQuery={true}
      className="flex-initial"
    />
  );
}

export default MoveCombobox;