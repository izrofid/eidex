import CurrentFilters from "../Filter/CurrentFilters/CurrentFilters";
import AbilityCombobox from "../Filter/FilterComponents/AbilityCombobox";
import MoveFilterGroup from "../Filter/FilterComponents/MoveFilterGroup";
import NameCombobox from "../Filter/FilterComponents/NameCombobox";
import StatFilter from "../Filter/StatFilter/StatFilter";
import TypePanel from "../Filter/TypePanel";
import SaveInfo from "../SaveInfo";
import SecondaryBar from "../SecondaryBar";
import CloseButton from "@/components/MiscUI/CloseButton";
import { useUIStore } from "@/stores/uiStore";
import FilterRadio from "../Filter/FilterRadio";
import ItemCombobox from "../Filter/FilterComponents/ItemCombobox";
import MoveCombobox from "../Filter/FilterComponents/MoveCombobox";

const PokedexSidebarContent: React.FC = () => {

    return(
    <>
        <div className="flex flex-initial w-full p-1 flex-col gap-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
<div className="flex flex-wrap w-full gap-2">
  <div className="flex-1 min-w-[180px]">
    <NameCombobox />
  </div>
  <div className="flex-1 min-w-[180px]">
    <AbilityCombobox />
  </div>
  <div className="flex-1">
    <MoveFilterGroup />
  </div>
  <div className="flex-1 min-w-[180px]">
            <ItemCombobox />
  </div>
</div>
            
            <TypePanel />
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
);}

export default PokedexSidebarContent;