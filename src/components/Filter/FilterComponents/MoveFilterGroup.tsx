import MoveSourceDropdown from "./MoveSourceDropdown";
import MoveCombobox from "./MoveCombobox";

function MoveFilterGroup() {
  return (
    <div className="flex w-full gap-1 items-center">
      <MoveSourceDropdown />
      <MoveCombobox/>
    </div>
  );
}

export default MoveFilterGroup;
