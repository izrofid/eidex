import React from "react";
import MoveDexCombobox from "../MoveDex/MoveDexCombobox";
import TypePanel from "../Filter/TypePanel";
import SaveInfo from "../SaveInfo";
import SecondaryBar from "../SecondaryBar";


const MoveDexSidebarContent: React.FC = () => {
  return (
<>
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
                <MoveDexCombobox/>
                <TypePanel/>
        </div>
        <div className="flex flex-col gap-3">
            <SaveInfo />
            <SecondaryBar />
        </div>
</>
  );
};

export default MoveDexSidebarContent;
