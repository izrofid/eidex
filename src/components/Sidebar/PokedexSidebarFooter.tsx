import React from "react";
import SaveInfo from "../SaveInfo";
import SecondaryBar from "../AppHeader/SecondaryBar";

const PokedexSidebarFooter: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <SaveInfo />
      <SecondaryBar />
    </div>
  );
};

export default PokedexSidebarFooter;
