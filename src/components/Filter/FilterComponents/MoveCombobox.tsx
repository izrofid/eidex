import GenericComboBox, { ComboBoxEntry } from "./GenericComboBox";
import moveData from "../../../data/moveData.json";
import { useMemo } from "react";
import { Move } from "../../../types";
import { useFilterStore } from "@/stores/filterStore";

const moveIDMap: ComboBoxEntry[] = Object.values(moveData)
  .filter((m) => typeof m === "object" && !!m && "moveId" in m)
  .map((m) => ({
    id: (m as Move).moveId,
    name: (m as Move).name,
  }));

function MoveCombobox() {
  const moveEntries: ComboBoxEntry[] = useMemo(() => moveIDMap, []);
  const moveValue = useFilterStore((state) => state.moveValue);
  const setMoveValue = useFilterStore((state) => state.setMoveValue);

  return (
    <GenericComboBox
      entries={moveEntries}
      onSelect={setMoveValue}
      value={moveValue}
      placeholder="Pick a move..."
      bg="bg-transparent"
    />
  );
}
export default MoveCombobox;
