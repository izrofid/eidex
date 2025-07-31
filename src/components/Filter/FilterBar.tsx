import CurrentFilters from "./CurrentFilters/CurrentFilters";
import SidebarButton from "./SidebarButton";
import { CommandMenu } from "./FilterCommand";

function FilterBar() {

  return (
    <div className="select-none">
      <div className="flex flex-1 items-center justify-between gap-3 rounded-t-lg px-3 py-2">
        <CommandMenu/>
        <SidebarButton></SidebarButton>
      </div>
      <div className="px-3 shadow-inner">
        <CurrentFilters />
      </div>
    </div>
  );
};

export default FilterBar;
