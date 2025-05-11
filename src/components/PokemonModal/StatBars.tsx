import { StatArray } from "@/types";

const STAT_LABELS = ["HP", "ATK", "DEF", "SPA", "SPD", "SPE"];

export type StatBarsProps = {
  stats: StatArray;
};

export default function StatBars({ stats }: StatBarsProps) {
  const reorderedStats: StatArray = [stats[0], stats[1],stats[2],stats[4],stats[5], stats[3]]
  const getHighestStat = (reorderedStats: StatArray) => Math.max(...reorderedStats);
  const highestStat = Math.max(getHighestStat(reorderedStats), 150)


  return (
    <div className="flex flex-col gap-1 w-full">
      {reorderedStats.map((value, i) => (
        <div key={STAT_LABELS[i]} className="flex items-center gap-2">
          <span className="w-8 font-pixel text-xs text-gray-200">{STAT_LABELS[i]}</span>
          <div className="w-full h-2 rounded bg-white">
            <div
              className="h-2 rounded bg-amber-300"
              style={{ width: `${(value / highestStat) * 100}%` }}
            />
          </div>
          <span className="w-8 text-right font-pixel text-xs text-gray-300">{value}</span>
        </div>
      ))}
    </div>
  );
}
