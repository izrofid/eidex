import CurrentFilters from "../Filter/CurrentFilters/CurrentFilters";
import AbilityCombobox from "../Filter/FilterComponents/AbilityCombobox";
import MoveFilterGroup from "../Filter/FilterComponents/MoveFilterGroup";
import NameCombobox from "../Filter/FilterComponents/NameCombobox";
import StatFilter from "../Filter/StatFilter/StatFilter";
import TypePanel from "../Filter/TypePanel";
import FilterRadio from "../Filter/FilterRadio";
import { SidebarTrigger } from "../ui/sidebar";
import { ThemeToggle } from "../ThemeProvider/ThemeToggle";

const PokedexSidebarContent: React.FC = () => {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2 pl-1">
        <span className="inline-flex select-none items-center">
          <span className="flex items-center">
            <span className="font-gr bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text pb-1 text-2xl font-extrabold tracking-tight text-transparent drop-shadow-sm">
              Poké
            </span>
            <span className="pb-1 text-2xl font-bold tracking-tight text-gray-100 drop-shadow-sm">
              Dex
            </span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <ThemeToggle />
          <span className="sm:hidden">
            <SidebarTrigger />
          </span>
        </span>
      </div>
      <div className="flex max-h-[calc(100vh-8rem)] flex-1 flex-col gap-3 overflow-y-auto">
        <NameCombobox />
        <AbilityCombobox />
        <MoveFilterGroup />
        <TypePanel />
        <FilterRadio />
        <StatFilter />
        <div className="my-3">
          <CurrentFilters />
        </div>
      </div>
    </>
  );
};

export default PokedexSidebarContent;
