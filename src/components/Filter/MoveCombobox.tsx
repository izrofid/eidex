import GenericComboBox, { ComboBoxEntry } from "./GenericComboBox";
import moveData from "../../data/moveData.json";
import { useMemo } from "react";
import { GiEnergySword } from "react-icons/gi";
import { Move } from "../../types";

const moveIDMap: ComboBoxEntry[] = Object.values(moveData)
  .filter((m) => typeof m === "object" && !!m && "ID" in m)
  .map((m) => ({
    id: (m as Move).id,
    name: (m as Move).name,
  }));

type ComboBoxDemoProps = {
  onSelect: (entry: ComboBoxEntry | null) => void;
};

function MoveCombobox({ onSelect }: ComboBoxDemoProps) {
  const moveEntries: ComboBoxEntry[] = useMemo(() => moveIDMap, []);

  return (
    <GenericComboBox
      entries={moveEntries}
      onSelect={onSelect}
      placeholder="Pick a move..."
      icon={<GiEnergySword />}
    />
  );
}
export default MoveCombobox;
