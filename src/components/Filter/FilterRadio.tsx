import { useModularFilterStore } from "@/stores/filterStore/index";
import React from "react";
import CycleButton from "../CycleButton";
import { MdBlock } from "react-icons/md";
import { LuFilterX, LuFilter } from "react-icons/lu";

const FilterRadio: React.FC = () => {
  const cycleMega = useModularFilterStore((state) => state.cycleMega);
  const megaCycle = useModularFilterStore((state) => state.megaCycle);
  const cycleNfe = useModularFilterStore((state) => state.cycleNfe);
  const nfeCycle = useModularFilterStore((state) => state.nfeCycle);

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
