import MoveSourceDropdown from "./MoveSourceDropdown";
import MoveCombobox from "./MoveCombobox";

function MoveFilterGroup() {

  //Get values from the store using selectors

  return (
    <div className="flex w-full items-center rounded-md bg-neutral-800 h-9">
      <MoveSourceDropdown />
      <MoveCombobox/>
    </div>
  );
}

export default MoveFilterGroup;
