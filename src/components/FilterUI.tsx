import { TYPE_INFO } from "../utils/typeData";

type FilterOptions = {
  name?: string;
  typeId?: number;
  minStat?: number;
  statType?: string;
};

type FilterBarProps = {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

export function FilterBar({ filters, setFilters }: FilterBarProps) {
  return (
    <div className="flex w-full flex-wrap justify-between gap-3 border bg-gray-900/70 px-2 py-4 shadow-md backdrop-blur">
      {/* Name search */}
      <input
        type="text"
        placeholder="Search Pokémon"
        value={filters.name || ""}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, name: e.target.value }))
        }
        className="w-60 rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2 text-white placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Type dropdown */}
      <select
        value={filters.typeId ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            typeId: e.target.value ? Number(e.target.value) : undefined,
          }))
        }
        className="w-48 rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2 text-white placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Types</option>
        {Object.values(TYPE_INFO).map((typeInfo) => (
          <option key={typeInfo.id} value={typeInfo.id}>
            {typeInfo.name}
          </option>
        ))}
      </select>

      {/* Group stat filter elements */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min value"
            value={filters.minStat ?? ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minStat: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
            className="w-28 rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2 text-white placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <span className="text-gray-400">in</span>
          
          <select
            value={filters.statType || "bst"}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                statType: e.target.value,
              }))
            }
            className="w-24 rounded-lg border border-gray-700 bg-slate-700 px-4 py-2 text-white placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    </div>
  );
}
