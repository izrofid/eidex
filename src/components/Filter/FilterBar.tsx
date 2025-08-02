import CurrentFilters from "./CurrentFilters/CurrentFilters";
import { CommandMenu } from "./FilterCommand";
import VaulDrawer from "../Drawer/MainDrawer";
import PokedexSidebarContent from "../Sidebar/PokedexSidebarContent";

function FilterBar() {

  return (
    <div className="select-none">
      <div className="flex flex-1 items-center justify-between gap-3 rounded-t-lg px-3 py-2">
        <CommandMenu/>
<VaulDrawer className="size-7 cursor-pointer hover:emerald-400">
          <PokedexSidebarContent/>
        </VaulDrawer>
      </div>
      <div className="px-3 shadow-inner">
        <CurrentFilters />
      </div>
    </div>
  );
};

export default FilterBar;
