import { MoveSource } from "../../types";
import MoveSourceDropdown from "./MoveSourceDropdown";
import { ComboBoxEntry } from "./GenericComboBox";
import MoveCombobox from "./MoveCombobox";

function MoveFilterGroup({
  moveSource,
  onMoveSourceChange,
  handleMoveSelect,
}: {
  moveSource: MoveSource;
  onMoveSourceChange: (v: MoveSource) => void;
  handleMoveSelect: (entry: ComboBoxEntry | null) => void;
}) {
  return (
    <div className="flex flex-1 items-center gap-2 rounded-md bg-neutral-800 focus-within:ring-1 focus-within:ring-blue-400 sm:h-9">
      <MoveSourceDropdown value={moveSource} onChange={onMoveSourceChange} />
      <MoveCombobox onSelect={handleMoveSelect} />
    </div>
  );
}

export default MoveFilterGroup;
