import { FaSliders } from "react-icons/fa6";
import CurrentFilters from "./CurrentFilters/CurrentFilters";
import AbilityCombobox from "./FilterComponents/AbilityCombobox";
import MoveFilterGroup from "./FilterComponents/MoveFilterGroup";
import StatFilter from "./StatFilter/StatFilter";
import SecondaryBar from "../AppHeader/SecondaryBar";
import TypePanel from "./TypePanel";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { useUIStore } from "@/stores/uiStore";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";

function FilterSidebar() {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const screenWidth = useScreenWidth();

  const isSmallScreen = screenWidth !== "md";

  const isScrollLock = isSmallScreen && isSidebarOpen;

  useBodyScrollLock(isScrollLock);

  return (
    <aside className="relative flex h-screen w-full flex-col justify-between border-r border-neutral-800 bg-zinc-800 px-5 py-6">
      <div className="mb-4 flex items-center gap-2">
        <FaSliders size={20} className="text-emerald-400" />
        <span className="text-xl font-bold text-gray-200">Filter Options</span>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <AbilityCombobox />
        <MoveFilterGroup />
        <TypePanel />
        <StatFilter />

        <div className="my-3">
          <CurrentFilters />
        </div>
      </div>

      <div className="mt-5">
        <SecondaryBar />
      </div>
    </aside>
  );
}

export default FilterSidebar;
