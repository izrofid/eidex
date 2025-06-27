import GenericComboBox, { ComboBoxEntry } from "./GenericComboBox";
import moveData from "../../../data/moveData.json";
import { useMemo } from "react";
import { LuSword } from "react-icons/lu";
import { Move } from "../../../types";
import { useModularFilterStore } from "@/stores/filterStore/index";

const moveIDMap: ComboBoxEntry[] = Object.values(moveData)
  .filter((m) => typeof m === "object" && !!m && "moveId" in m)
  .map((m) => ({
    id: (m as Move).moveId,
    name: (m as Move).name,
  }));

function MoveCombobox() {
  const moveEntries: ComboBoxEntry[] = useMemo(() => moveIDMap, []);
  const setMoveValue = useModularFilterStore((state) => state.setMoveValue);

  return (
    <GenericComboBox
      entries={moveEntries}
      onSelect={setMoveValue}
      placeholder="Pick a move..."
      icon={<LuSword />}
      bg="bg-transparent"
    />
  );
}
export default MoveCombobox;
