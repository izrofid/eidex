import CurrentFilters from "../Filter/CurrentFilters/CurrentFilters";
import AbilityCombobox from "../Filter/FilterComponents/AbilityCombobox";
import MoveFilterGroup from "../Filter/FilterComponents/MoveFilterGroup";
import NameCombobox from "../Filter/FilterComponents/NameCombobox";
import StatFilter from "../Filter/StatFilter/StatFilter";
import TypePanel from "../Filter/TypePanel";
import FilterRadio from "../Filter/FilterRadio";
import { SidebarTrigger } from "../ui/sidebar";

const PokedexSidebarContent: React.FC = () => {
    

    return(
    <>
        <div className="mb-4 pl-1 flex items-center gap-2 justify-between">
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
            <span className="sm:hidden"><SidebarTrigger/></span>
        </div>
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <NameCombobox />
            <AbilityCombobox />
            <MoveFilterGroup />
            <TypePanel />
            <FilterRadio/>
            <StatFilter />
            <div className="my-3">
                <CurrentFilters />
            </div>
        </div>
    </>
);}

export default PokedexSidebarContent;