import { Slider } from "@/components/ui/slider";
import StatInputBox from "./StatInputBox";

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
  return (
    <div className="flex flex-1 flex-row items-center gap-2 cursor-pointer">
      <Slider
        max={max}
        step={1}
        value={chosenStat !== undefined ? [chosenStat] : [min]}
        onValueChange={([val]) => setChosenStat(val)}
        className="flex-1"
        colorPrimary="bg-emerald-400"
      />
     <StatInputBox max={max}/>
    </div>
  );
}

export default StatSlider;
