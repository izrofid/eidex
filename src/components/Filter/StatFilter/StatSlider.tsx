import { Slider } from "@/components/ui/slider";
import StatInputBox from "./StatInputBox";
import { useFilterStore } from "@/stores/filterStore";

interface StatSliderProps {
  max: number;
  chosenStat: number | undefined;
  min: number;
  setChosenStat: (stat: number | undefined) => void;
}

function StatSlider({
  max,
  chosenStat,
  min,
  setChosenStat,
}: StatSliderProps) {

  const isStatMax = useFilterStore((state) => state.isStatMax)
  const barColor:string = isStatMax ? "bg-rose-400" : "bg-emerald-400"

  return (
    <div className="flex flex-1 flex-row-reverse items-center gap-2 cursor-pointer">
      <Slider
        max={max}
        step={1}
        value={chosenStat !== undefined ? [chosenStat] : [min]}
        onValueChange={([val]) => setChosenStat(val)}
        className="flex-1"
        colorPrimary={barColor}
      />
     <StatInputBox max={max}/>
    </div>
  );
}

export default StatSlider;
