import { useEffect } from "react";
import { useModularFilterStore } from "@/stores/filterStore/index";
import StatSlider from "./StatSlider";
import StatSelector from "./StatSelector";

function StatFilter() {
  const {
    statValue,
    statType,
    setStatValue,
  } = useModularFilterStore();


  // Only declare these once
  const isBST = !statType;
  const min = 0;
  const max = isBST ? 780 : 255;

  // Clamp statValue to max when statType changes
  useEffect(() => {
    if (statValue !== undefined && statValue > max) {
      setStatValue(max);
    }
  }, [statType, max]);

  return (
    <div className="flex w-full flex-col lg:flex-wrap-reverse gap-3">
      <StatSlider
        max={max}
        min={min}
      />
      <StatSelector/>
    </div>
  );
}

export default StatFilter;
