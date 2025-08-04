import CurrentFilters from "../Filter/CurrentFilters/CurrentFilters";
import AbilityCombobox from "../Filter/FilterComponents/AbilityCombobox";
import MoveFilterGroup from "../Filter/FilterComponents/MoveFilterGroup";
import NameCombobox from "../Filter/FilterComponents/NameCombobox";
import StatFilter from "../Filter/StatFilter/StatFilter";
import TypePanel from "../Filter/TypePanel";
import SaveInfo from "../SaveInfo";
import SecondaryBar from "../SecondaryBar";
import FilterRadio from "../Filter/FilterRadio";
import ItemCombobox from "../Filter/FilterComponents/ItemCombobox";

const PokedexSidebarContent: React.FC = () => {
    return(
    <>
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <NameCombobox />
            <AbilityCombobox />
            <MoveFilterGroup />
            <TypePanel />
            <ItemCombobox />
            <FilterRadio/>
            <StatFilter />
            <div className="my-3">
                <CurrentFilters />
            </div>
        </div>
        <div className="flex flex-col gap-3">
            <SaveInfo />
            <SecondaryBar />
        </div>
    </>
    );
};

export default PokedexSidebarContent;