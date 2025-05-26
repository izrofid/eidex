import {
  getConsolidatedEncounters,
  getConsolidatedMethodName,
  cleanLocation,
  getConsolidatedMethodColor,
} from "@/utils/locationsData";
import React, { useMemo } from "react";

interface PokemonLocationsProps {
  pokemonId: number;
}

const PokemonLocations: React.FC<PokemonLocationsProps> = ({ pokemonId }) => {
  const encounters = getConsolidatedEncounters(pokemonId);

  // Calculate the maximum width needed for location names
  const maxLocationWidth = useMemo(() => {
    if (encounters.length === 0) return "auto";

    // Find the longest location name after cleaning
    const longestLocation = encounters.reduce((longest, encounter) => {
      const cleanedName = cleanLocation(encounter.mapName);
      return cleanedName.length > longest.length ? cleanedName : longest;
    }, "");

    // Calculate a width based on the character count, with some padding
    return longestLocation.length > 0
      ? `${longestLocation.length * 0.5}rem`
      : "auto";
  }, [encounters]);

  if (encounters.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg">
        <div
          className="grid w-full gap-2 text-xs text-gray-200 sm:text-sm"
          style={{
            gridTemplateColumns: `minmax(${maxLocationWidth},1fr) 1fr 1fr`,
          }}
        >
          {/* Table header */}
          <div className="font-chakra bg-zinc-700/50 px-3 py-2 font-medium">
            Location
          </div>
          <div className="font-chakra bg-zinc-700/50 px-3 py-2 text-center font-medium">
            Method
          </div>
          <div className="font-chakra bg-zinc-700/50 px-3 py-2 text-center font-medium">
            Level
          </div>

          {/* Table rows */}
          {encounters.map((encounter, idx) => (
            <React.Fragment key={`${idx}-mapName`}>
              <div className="flex items-center bg-zinc-800/60 px-3 py-2">
                {cleanLocation(encounter.mapName)}
              </div>
              <div
                className={`flex items-center justify-center px-3 py-2 text-center ${getConsolidatedMethodColor(
                  encounter.method,
                  encounter.slots
                )}`}
              >
                {getConsolidatedMethodName(encounter.method, encounter.slots)}
              </div>
              <div className="flex items-center justify-center bg-zinc-800/60 px-3 py-2 text-center">
                {`Lvl ${encounter.min_level}-${encounter.max_level}`}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonLocations;
