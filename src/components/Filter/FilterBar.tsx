import NameCombobox from "./FilterComponents/NameCombobox";
import CurrentFilters from "./CurrentFilters/CurrentFilters";
import SidebarButton from "./SidebarButton";

function FilterBar() {

  return (
    <div className="select-none">
      <div className="flex flex-1 items-center justify-between gap-3 rounded-t-lg px-3 py-2 shadow-lg">
        <NameCombobox/>
        <SidebarButton></SidebarButton>
      </div>
      <div className="px-3 bg-gray-600/20 shadow-x-md">
        <CurrentFilters />
      </div>
    </div>
  );
};

export default FilterBar;
