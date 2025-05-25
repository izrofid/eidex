import pokeBall from "/icons/pokeball.svg";
import CurrentFilters from "../Filter/CurrentFilters/CurrentFilters";
import AbilityCombobox from "../Filter/FilterComponents/AbilityCombobox";
import MoveFilterGroup from "../Filter/FilterComponents/MoveFilterGroup";
import NameCombobox from "../Filter/FilterComponents/NameCombobox";
import StatFilter from "../Filter/StatFilter/StatFilter";
import TypePanel from "../Filter/TypePanel";
import SaveInfo from "../SaveInfo";
import SecondaryBar from "../AppHeader/SecondaryBar";
import React from "react";
import SidebarButton from "../Filter/SidebarButton";

const PokedexSidebarContent: React.FC = React.memo(function SidebarContent() {
  return (
    <>
      <div className="mb-4 flex justify-between pr-2">
        <div className="flex flex-row items-center gap-2 pl-1">
          <img src={pokeBall} alt="Pokéball" className="h-6 w-6" />
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
        </div>
        <SidebarButton icon="X" />
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
    </>
  );
});

export default PokedexSidebarContent;
