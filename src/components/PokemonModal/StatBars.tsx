import { StatArray } from "@/types";

const STAT_LABELS = ["HP", "ATK", "DEF", "SPA", "SPD", "SPE"];

export type StatBarsProps = {
  stats: StatArray;
};

export default function StatBars({ stats }: StatBarsProps) {
  const reorderedStats: StatArray = [
    stats[0],
    stats[1],
    stats[2],
    stats[4],
    stats[5],
    stats[3],
  ];
  const getHighestStat = (reorderedStats: StatArray) =>
    Math.max(...reorderedStats);
  const highestStat = Math.max(getHighestStat(reorderedStats), 150);

  const getBarColor = (stat: number) => {
    if (stat < 50) return "#eb4034";
    if (stat < 80) return "#e3c51b";
    if (stat < 120) return "#21ad28";
    if (stat < 150) return "#25f7ca";
    return "#25c6f7";
  };

  return (
    <div className="neutral-box flex w-full flex-col gap-1 rounded-sm p-2">
      {reorderedStats.map((value, i) => (
        <div
          key={STAT_LABELS[i]}
          className="mx-auto flex w-full items-center gap-2"
        >
          <span className="font-pixel w-8 text-sm text-gray-200">
            {STAT_LABELS[i]}
          </span>
          <div className="h-2 flex-1 rounded ">
            <div
              className="h-2 rounded"
              style={{
                width: `${(value / highestStat) * 100}%`,
                background: getBarColor(value),
              }}
            />
          </div>
          <span className="font-pixel w-8 text-right text-sm text-gray-300">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
