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
    return longestLocation.length > 0
      ? `${longestLocation.length * 0.5}rem`
      : "auto";
  }, [encounters]);

  return (
    encounters.length > 0 && (
      <div className="neutral-box flex rounded-md p-3">
        <div
          className={`grid w-full grid-cols-3 gap-2 text-xs text-gray-200 sm:text-sm`}
          style={{
            gridTemplateColumns: `minmax(${maxLocationWidth},1fr) 1fr 1fr`,
          }}
        >
          {encounters.map((encounter, idx) => (
            <React.Fragment key={`${idx}-mapName`}>
              <span
                className="flex min-h-6 items-center justify-center rounded-sm bg-zinc-700 px-2 overflow-x-hidden"
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
                className="flex min-h-6 items-center justify-center rounded-sm px-2"
              >
                {getMethodName(encounter.method, encounter.slot)}
              </span>
              <span className="flex min-h-6 items-center justify-center rounded-sm bg-zinc-700 px-2">
                {`Lvl ${encounter.min_level}-${encounter.max_level}`}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  );
};

export default PokemonLocations;
