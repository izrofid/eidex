import { useFilterStore } from "@/stores/filterStore";
import React from "react";
import CycleButton from "../CycleButton";
import { MdBlock } from "react-icons/md";
import { LuFilterX, LuFilter } from "react-icons/lu";

const FilterRadio: React.FC = () => {
  const cycleMega = useFilterStore((state) => state.cycleMega);
  const megaCycle = useFilterStore((state) => state.megaCycle);
  const cycleNfe = useFilterStore((state) => state.cycleNfe);
  const nfeCycle = useFilterStore((state) => state.nfeCycle);

  return (
    <div className="flex justify-start gap-3 w-full rounded-md bg-card-backdrop p-3">
      <CycleButton 
        label="Mega" 
        onClick={cycleMega} 
        value={megaCycle}
        icons={[LuFilter, LuFilterX, MdBlock]} // [true (Only Megas), false (No Megas), undefined (Filter Off)]
      />
        <CycleButton 
        label="Evolved" 
        onClick={cycleNfe} 
        value={nfeCycle}
        icons={[LuFilter, LuFilterX, MdBlock]} // [true (Only Megas), false (No Megas), undefined (Filter Off)]
      />
    </div>
  );
};

export default FilterRadio;
