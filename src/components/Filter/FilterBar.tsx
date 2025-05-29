import NameCombobox from "./FilterComponents/NameCombobox";
import CurrentFilters from "./CurrentFilters/CurrentFilters";
import SidebarButton from "./SidebarButton";

function FilterBar() {

  return (
    <div className="select-none">
      <div className="flex flex-1  bg-neutral-200 dark:bg-neutral-900 items-center justify-between gap-3 px-3 py-2 shadow-md">
        <NameCombobox/>
        <SidebarButton></SidebarButton>
      </div>
      <div className="px-3 shadow-inner">
        <CurrentFilters />
      </div>
    </div>
  );
};

export default FilterBar;
