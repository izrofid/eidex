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

  const bst = reorderedStats.reduce((sum, stat) => sum + stat, 0);

  const getHighestStat = (reorderedStats: StatArray) =>
    Math.max(...reorderedStats);
  const highestStat = Math.max(getHighestStat(reorderedStats), 150);

  const getStatColorClass = (stat: number) => {
    if (stat < 50) return "bg-red-500";
    if (stat < 80) return "bg-amber-400";
    if (stat < 120) return "bg-emerald-500";
    if (stat < 150) return "bg-green-400";
    return "bg-cyan-400";
  };

  const getBstColorClass = (bst: number) => {
    if (bst < 450) return "bg-red-500";
    if (bst < 500) return "bg-amber-400";
    if (bst < 600) return "bg-emerald-500";
    if (bst < 700) return "bg-green-400";
    return "bg-cyan-400";
  };

  return (
    <div className="w-full select-none rounded-xl p-5 bg-card-backdrop shadow-md">
      <h3 className="font-chakra text-lg font-medium text-gray-100 mb-3">Base Stats</h3>
      <div className="space-y-3">
        {reorderedStats.map((value, i) => (
          <div
            key={STAT_LABELS[i]}
            className="flex items-center gap-3"
          >
            <span className="font-chakra w-10 text-sm font-medium text-gray-200">
              {STAT_LABELS[i]}
            </span>
            <div className="h-3 flex-1 rounded-full bg-zinc-800/80 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ease-in-out shadow-sm ${getStatColorClass(value)}`}
                style={{
                  width: `${(value / 255) * 100}%`
                }}
              />
            </div>
            <span className="font-chakra w-10 text-right text-sm font-medium text-gray-300">
              {value}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-5 pt-3 border-t border-zinc-600/60">
        <div className="flex items-center gap-3">
          <span className="font-chakra w-10 text-sm font-bold text-purple-400">BST</span>
          <div className="h-4 flex-1 rounded-sm bg-zinc-800/80 overflow-hidden">
            <div
              className={`h-full rounded-sm transition-all duration-300 ease-in-out shadow-md ${getBstColorClass(bst)}`}
              style={{
                width: `${(bst / 790) * 100}%`
              }}
            />
          </div>
          <span className="font-chakra w-10 text-right text-sm font-bold text-purple-400">
            {bst}
          </span>
        </div>
      </div>
    </div>
  );
}