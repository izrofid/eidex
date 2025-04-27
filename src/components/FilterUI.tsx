import { TYPE_INFO } from "../utils/typeData";

type FilterOptions = {
  name?: string;
  typeId?: number;
  minBST?: number;
};

type FilterBarProps = {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

export function FilterBar({ filters, setFilters }: FilterBarProps) {
  return (
    <div className="flex flex-wrap justify-center w-full py-4 border gap-4 bg-gray-900/70 backdrop-blur shadow-md">
      {/* Name search */}
      <input
        type="text"
        placeholder="Search Pokémon"
        value={filters.name || ""}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, name: e.target.value }))
        }
        className="w-60 rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
        className="w-48 rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      >
        <option value="">All Types</option>
        {Object.values(TYPE_INFO).map((typeInfo) => (
          <option key={typeInfo.id} value={typeInfo.id}>
            {typeInfo.name}
          </option>
        ))}
      </select>

      {/* Min BST input */}
      <input
        type="number"
        placeholder="Min BST"
        value={filters.minBST ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            minBST: e.target.value ? Number(e.target.value) : undefined,
          }))
        }
        className="w-32 rounded-lg border border-gray-700 bg-gray-800/80 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>
  );
}
