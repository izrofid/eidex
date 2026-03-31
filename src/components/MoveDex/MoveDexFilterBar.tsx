import SidebarButton from "../Filter/SidebarButton";
import MoveDexCombobox from "./MoveDexCombobox";

function MoveDexFilterBar() {

  return (
    <div className="flex items-center gap-1">
      <MoveDexCombobox/>
      <SidebarButton/>
    </div>
  );
};

export default MoveDexFilterBar;
