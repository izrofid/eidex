import { Slider } from "@/components/ui/slider";
import StatInputBox from "./StatInputBox";
import { useModularFilterStore } from "@/stores/filterStore/index";




function StatSlider({ max, min }: { max: number; min: number }) {
  const statValue = useModularFilterStore((state) => state.statValue);
  const setStatValue = useModularFilterStore((state) => state.setStatValue);
  const isStatMax = useModularFilterStore((state) => state.isStatMax);
  const barColor: string = isStatMax ? "bg-rose-400" : "bg-emerald-400";

  return (
    <div className="flex flex-1 flex-row-reverse items-center gap-2 cursor-pointer">
      <Slider
        max={max}
        step={1}
        value={statValue !== undefined ? [statValue] : [min]}
        onValueChange={([val]) => setStatValue(val)}
        className="flex-1"
        colorPrimary={barColor}
      />
      <StatInputBox max={max} />
    </div>
  );
}

export default StatSlider;
