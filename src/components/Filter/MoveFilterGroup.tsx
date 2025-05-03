import { MoveSource } from "../../types";
import MoveSourceDropdown from "./MoveSourceDropdown";
import MoveDropdown from "./MoveDropdown";

function MoveFilterGroup({
  moveSource,
  onMoveSourceChange,
  moveName,
  onMoveNameChange,
}: {
  moveSource: MoveSource;
  onMoveSourceChange: (v: MoveSource) => void;
  moveName: string;
  onMoveNameChange: (v: string) => void;
}) {
  return (
    <div className="flex h-9 flex-1 items-center gap-2 rounded-md bg-gray-800 px-2 py-1 focus-within:ring-1 focus-within:ring-blue-400">
      <MoveSourceDropdown value={moveSource} onChange={onMoveSourceChange} />
      <MoveDropdown
        value={moveName}
        onChange={onMoveNameChange}
        placeholder="Move Name"
      />
    </div>
  );
}

export default MoveFilterGroup;