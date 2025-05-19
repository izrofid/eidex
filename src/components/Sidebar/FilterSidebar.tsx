import pokeBall from "/icons/pokeball.svg"
import CurrentFilters from "../Filter/CurrentFilters/CurrentFilters";
import AbilityCombobox from "../Filter/FilterComponents/AbilityCombobox";
import MoveFilterGroup from "../Filter/FilterComponents/MoveFilterGroup";
import StatFilter from "../Filter//StatFilter/StatFilter";
import SecondaryBar from "../AppHeader/SecondaryBar";
import TypePanel from "../Filter/TypePanel";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { useUIStore } from "@/stores/uiStore";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import NameCombobox from "../Filter//FilterComponents/NameCombobox";
import SaveInfo from "../SaveInfo";

function FilterSidebar() {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const screenWidth = useScreenWidth();

  const isSmallScreen = screenWidth !== "md";

  const isScrollLock = isSmallScreen && isSidebarOpen;

  useBodyScrollLock(isScrollLock);

  return (
    <aside className="shadow-xl/50 relative flex h-[100dvh] w-full flex-col justify-between border-r border-neutral-800 bg-zinc-900 px-5 py-6">
      <div className="mb-4 pl-1 flex items-center gap-2">
        <img src={pokeBall} alt="Pokéball" className="w-6 h-6" />
        <span className="inline-flex items-center select-none">
          <span className="flex items-center">
            <span className="text-2xl font-extrabold font-gr bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent drop-shadow-sm tracking-tight pb-1">
              Poké
            </span>
            <span className="text-2xl font-bold text-gray-100 tracking-tight drop-shadow-sm pb-1">
              Dex
            </span>
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <NameCombobox />
        <AbilityCombobox />
        <MoveFilterGroup />
        <TypePanel />
        <StatFilter />
        <div className="my-3">
          <CurrentFilters />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <SaveInfo />
        <SecondaryBar />
      </div>
    </aside>
  );
}

export default FilterSidebar;
