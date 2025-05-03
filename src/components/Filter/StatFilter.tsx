
function StatFilter({
  minStat,
  statType,
  onMinStatChange,
  onStatTypeChange,
}: {
  minStat: number | undefined;
  statType: string | undefined;
  onMinStatChange: (v: number | undefined) => void;
  onStatTypeChange: (v: string) => void;
}) {
  return (
    <div className="group flex flex-1 items-center h-9 justify-evenly rounded-md bg-gray-800 focus-within:ring-1 focus-within:ring-blue-400">
      <input
        type="number"
        placeholder="Min"
        value={minStat ?? ""}
        onChange={(e) =>
          onMinStatChange(e.target.value ? Number(e.target.value) : undefined)
        }
        className="h-9 border-0 w-10 bg-transparent pl-2 text-sm text-white focus:outline-none focus:ring-0"
      />
      <div className="flex h-9 items-center px-1">
        <span className="text-xs text-gray-400">in</span>
      </div>
      <div className="relative">
        <select
          value={statType || "bst"}
          onChange={(e) => onStatTypeChange(e.target.value)}
          className="h-9 appearance-none border-0 bg-gray-800 pl-2 pr-6 text-sm text-white focus:outline-none focus:ring-0"
        >
          <option value="">BST</option>
          <option value="hp">HP</option>
          <option value="attack">Atk</option>
          <option value="defense">Def</option>
          <option value="spAtk">SpA</option>
          <option value="spDef">SpD</option>
          <option value="speed">Spe</option>
        </select>
      </div>
    </div>
  );
}

export default StatFilter;