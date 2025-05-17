import {
  getEncountersByPokemonId,
  getMethodName,
  cleanLocation,
  getMethodColor,
} from "@/utils/locationsData";
import React, { useMemo } from "react";

interface PokemonLocationsProps {
  pokemonId: number;
}

const PokemonLocations: React.FC<PokemonLocationsProps> = ({ pokemonId }) => {
  const encounters = getEncountersByPokemonId(pokemonId);

  // Calculate the maximum width needed for location names
  const maxLocationWidth = useMemo(() => {
    if (encounters.length === 0) return "auto";
    
    // Find the longest location name after cleaning
    const longestLocation = encounters.reduce((longest, encounter) => {
      const cleanedName = cleanLocation(encounter.mapName);
      return cleanedName.length > longest.length ? cleanedName : longest;
    }, "");
    
    // Calculate a width based on the character count, with some padding
    return longestLocation.length > 0 ? `${longestLocation.length * 0.50}rem` : "auto";
  }, [encounters]);

return (
  encounters.length > 0 && (
    <div className="neutral-box flex rounded-md p-3">
      <div className="flex w-full flex-col justify-between gap-2 text-nowrap text-center text-xs sm:text-sm text-gray-200">
        {encounters.map((encounter, idx) => (
          <div
            key={`${idx}-mapName`}
            className="flex justify-between gap-2 sm:mr-[20%]"
          >
            <span 
              className="min-w-max min-h-6 rounded-sm bg-zinc-700 px-2 flex items-center justify-center"
              style={{ width: maxLocationWidth, display: "inline-flex" }}
            >
              {cleanLocation(encounter.mapName)}
            </span>
            <span
              style={{
                backgroundColor: getMethodColor(
                  encounter.method,
                  encounter.slot,
                ),
              }}
              className="w-25 min-w-max min-h-6 rounded-sm px-2 flex items-center justify-center"
            >
              {getMethodName(encounter.method, encounter.slot)}
            </span>
            <span className="w-25 min-w-max min-h-6 rounded-sm bg-zinc-700 px-2 flex items-center justify-center">
              {`Lvl ${encounter.min_level}-${encounter.max_level}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
);
};

export default PokemonLocations;
