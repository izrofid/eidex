import { useEffect } from "react";
import { useFilterStore } from "@/stores/filterStore";
import StatSlider from "./StatSlider";
import StatSelector from "./StatSelector";

function StatFilter() {
  const {
    chosenStat,
    statType,
    isStatMax,
    setChosenStat,
    setStatType,
    toggleStatMax,
  } = useFilterStore();

  const statOptions = [
    { value: "", label: "BST" },
    { value: "hp", label: "HP" },
    { value: "attack", label: "Atk" },
    { value: "defense", label: "Def" },
    { value: "spAtk", label: "SpA" },
    { value: "spDef", label: "SpD" },
    { value: "speed", label: "Spe" },
  ];

  // Only declare these once
  const isBST = !statType;
  const min = 0;
  const max = isBST ? 780 : 255;

  // Clamp chosenStat to max when statType changes
  useEffect(() => {
    if (chosenStat !== undefined && chosenStat > max) {
      setChosenStat(max);
    }
  }, [statType, max]);

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row-reverse">
      <StatSlider
        max={max}
        chosenStat={chosenStat}
        min={min}
        setChosenStat={setChosenStat}
      />
      <StatSelector
        statType={statType}
        setStatType={setStatType}
        statOptions={statOptions}
        toggleStatMax={toggleStatMax}
        isStatMax={isStatMax}
      />
    </div>
  );
}

export default StatFilter;
