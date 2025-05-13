import MoveSourceDropdown from "./MoveSourceDropdown";
import MoveCombobox from "./MoveCombobox";

function MoveFilterGroup() {

  //Get values from the store using selectors

  return (
    <div className="flex flex-1 items-center gap-2 rounded-md bg-neutral-800 focus-within:ring-1 focus-within:ring-blue-400 sm:h-9">
      <MoveSourceDropdown />
      <MoveCombobox/>
    </div>
  );
}

export default MoveFilterGroup;
