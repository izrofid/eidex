import speciesLabelMap from "@/data/speciesLabelMap.json";
import wildEncountersData from "@/data/wild_encounters.json";
import { capitalize, removeSuffix } from "./miscUtils";

// Type definitions for the new wild encounters data structure
interface WildPokemon {
  min_level: number;
  max_level: number;
  species: string;
}

interface EncounterMethod {
  encounter_rate: number;
  mons: WildPokemon[];
}

interface WildEncounter {
  map: string;
  base_label: string;
  land_mons?: EncounterMethod;
  water_mons?: EncounterMethod;
  rock_smash_mons?: EncounterMethod;
  fishing_mons?: EncounterMethod;
}

interface WildEncounterGroup {
  label: string;
  for_maps: boolean;
  encounters: WildEncounter[];
}

interface WildEncountersData {
  wild_encounter_groups: WildEncounterGroup[];
}

function buildEncountersLookup() {
  const encountersMap: Record<string, any[]> = {};
  
  // Type cast the imported data
  const data = wildEncountersData as WildEncountersData;
  
  // Process each encounter group
  data.wild_encounter_groups.forEach(group => {
    if (!group.for_maps) return; // Skip battle facility encounters
    
    group.encounters.forEach(encounter => {
      const mapName = encounter.map?.replace('MAP_', '').replace(/_/g, ' ') || 
                     encounter.base_label?.replace(/^g/, '').replace(/([A-Z])/g, ' $1').trim();
      
      // Process each encounter type (land_mons, water_mons, fishing_mons, etc.)
      Object.entries(encounter).forEach(([method, encounterData]) => {
        if (method === 'map' || method === 'base_label' || !encounterData?.mons) return;
        
        const methodName = method.replace('_mons', '').replace('_', ' ');
        
        encounterData.mons.forEach((mon: WildPokemon, slot: number) => {
          if (!mon.species) return;
          
          const speciesKey = mon.species;
          if (!encountersMap[speciesKey]) {
            encountersMap[speciesKey] = [];
          }
          
          encountersMap[speciesKey].push({
            map: encounter.map,
            base_label: encounter.base_label,
            method: methodName === 'land' ? 'walk' : methodName,
            rate: encounterData.encounter_rate,
            slot: slot,
            min_level: mon.min_level || 1,
            max_level: mon.max_level || mon.min_level || 1,
            mapName: mapName
          });
        });
      });
    });
  });
  
  return encountersMap;
}

// Build the encounters lookup from the new data structure
const wildEncounters = buildEncountersLookup();

// Creating a reverse lookup map where keys are species IDs and values are species labels
const encountersLookupMap: Record<number, string> = Object.entries(
  speciesLabelMap,
).reduce(
  (acc, [label, id]) => {
    acc[id] = label;
    return acc;
  },
  {} as Record<number, string>,
);

export function getEncountersByPokemonId(pokemonId: number) {
  const speciesLabel = encountersLookupMap[pokemonId];
  if (!speciesLabel) return [];

  const encounters =
    wildEncounters[speciesLabel as keyof typeof wildEncounters] || [];
  return encounters.filter(
    (encounter) => !encounter.map?.includes("UNUSED_RUBY_SAPPHIRE"),
  );
}

export function isObtainable(pokemonId: number): boolean {
  const encounters = getEncountersByPokemonId(pokemonId);
  return encounters.length > 0;
}

export function getAllEncounters() {
  return wildEncounters;
}

export { encountersLookupMap };

export function getMethodName(method: string, slot: number) {
  if (method === "fishing" || method === "fishing_mons") {
    if (slot === 0 || slot === 1) {
      return "Old Rod";
    } else if (slot >= 2 && slot <= 4) {
      return "Good Rod";
    } else if (slot >= 5 && slot <= 9) {
      return "Super Rod";
    }
  } else {
    return capitalize(method.trim());
  }
}

export function cleanLocation(location: string) {
  const suffixes = ["Town", "City"];
  const replacements: Record<string, string> = {
    "Safari Zone": "Safari",
    Route: "Rt.",
    Northwest: "NW",
    Northeast: "NE",
    North: "N",
    Southwest: "SW",
    Southeast: "SE",
    South: "S",
    East: "E",
    West: "W",
  };

  //Convert to title case (each word capitalized), but preserve uppercase for route/floor codes
  location = location
    .split(" ")
    .map((word) => {
      // Preserve uppercase for patterns like "1R", "B1F", "2F", etc.
      if (/^\d+[A-Z]$|^[A-Z]\d+[A-Z]?$/.test(word.toUpperCase())) {
        return word.toUpperCase();
      }
      return capitalize(word.toLowerCase());
    })
    .join(" ");


  // Apply replacements first
  Object.entries(replacements).forEach(([key, value]) => {
    const regex = new RegExp(key, "i"); // Create a case-insensitive regex
    if (regex.test(location)) {
      location = location.replace(regex, value);
    }
  });

  // Remove suffixes
  return removeSuffix(location, suffixes);
}

export function getMethodColor(method: string, slot: number) {
  if (method === "fishing" || method === "fishing_mons") {
    if (slot === 0 || slot === 1) {
      return "bg-blue-500"; // Old Rod
    } else if (slot >= 2 && slot <= 4) {
      return "bg-sky-500"; // Good Rod
    } else if (slot >= 5 && slot <= 9) {
      return "bg-purple-600"; // Super Rod
    }
  }
  if (method === "walk") {
    return "bg-emerald-700"; // Walk
  }
  if (method === "rock smash") {
    return "bg-red-700"; // Rock Smash
  }
  if (method === "water") {
    return "bg-blue-700"; // Surf
  }
  return "bg-gray-500"; // Default color
}

/**
 * Type representing a consolidated encounter
 */
export interface ConsolidatedEncounter {
  mapName: string;
  method: string;
  min_level: number;
  max_level: number;
  slots?: number[];
}

/**
 * Consolidates encounters for a Pokémon by combining entries from the same location
 * with contiguous level ranges.
 *
 * @param pokemonId - The ID of the Pokémon to get consolidated encounters for
 * @returns Array of consolidated encounters
 */
export function getConsolidatedEncounters(
  pokemonId: number,
): ConsolidatedEncounter[] {
  const encounters = getEncountersByPokemonId(pokemonId);
  if (encounters.length === 0) return [];

  // Group encounters by location and method (treating fishing rods as separate methods)
  const groupedEncounters: Record<
    string,
    Record<string, typeof encounters>
  > = {};

  encounters.forEach((encounter) => {
    const mapKey = encounter.mapName;
    let methodKey = encounter.method;

    // For fishing, use a more specific method key that includes the rod type
    if (methodKey === "fishing") {
      const slot = encounter.slot;
      if (slot >= 0 && slot <= 2) {
        methodKey = "fishing_old";
      } else if (slot >= 3 && slot <= 5) {
        methodKey = "fishing_good";
      } else if (slot > 5 ) {
        methodKey = "fishing_super";
      }
    }

    if (!groupedEncounters[mapKey]) {
      groupedEncounters[mapKey] = {};
    }

    if (!groupedEncounters[mapKey][methodKey]) {
      groupedEncounters[mapKey][methodKey] = [];
    }

    groupedEncounters[mapKey][methodKey].push(encounter);
  });

  const consolidatedEncounters: ConsolidatedEncounter[] = [];

  // Process each location and method group
  Object.keys(groupedEncounters).forEach((mapName) => {
    Object.keys(groupedEncounters[mapName]).forEach((method) => {
      const encounters = groupedEncounters[mapName][method];

      // Sort by min_level
      encounters.sort((a, b) => a.min_level - b.min_level);

      // Start with the first encounter as our initial range
      let currentRange = {
        mapName,
        method,
        min_level: encounters[0].min_level,
        max_level: encounters[0].max_level,
        slots: [encounters[0].slot],
      };

      // Process the rest of the encounters
      for (let i = 1; i < encounters.length; i++) {
        const current = encounters[i];

        // Check if the current encounter's range is contiguous with our accumulated range
        if (current.min_level <= currentRange.max_level + 1) {
          // Extend the current range
          currentRange.max_level = Math.max(
            currentRange.max_level,
            current.max_level,
          );
          // Add the slot if it's not already included
          if (!currentRange.slots.includes(current.slot)) {
            currentRange.slots.push(current.slot);
          }
        } else {
          // This range is not contiguous, so add the current range to results
          // and start a new one
          consolidatedEncounters.push({ ...currentRange });
          currentRange = {
            mapName,
            method,
            min_level: current.min_level,
            max_level: current.max_level,
            slots: [current.slot],
          };
        }
      }

      // Add the final range
      consolidatedEncounters.push({ ...currentRange });
    });
  });

  return consolidatedEncounters;
}

/**
 * Gets a descriptive method name for a consolidated encounter with potentially multiple slots
 *
 * @param method - The encounter method
 * @param slots - Array of slot numbers
 * @returns A descriptive method name
 */
export function getConsolidatedMethodName(
  method: string,
  slots?: number[],
): string {
  // Handle specific fishing rod methods
  if (method === "fishing_old") {
    return "Old Rod";
  } else if (method === "fishing_good") {
    return "Good Rod";
  } else if (method === "fishing_super") {
    return "Super Rod";
  }

  // Handle original fishing method (for backward compatibility)
  if (method === "fishing") {
    if (!slots || slots.length === 0) {
      return "Fishing";
    }

    // Check which rod types are included
    const hasOldRod = slots.some((slot) => slot === 0 || slot === 1);
    const hasGoodRod = slots.some((slot) => slot >= 2 && slot <= 4);
    const hasSuperRod = slots.some((slot) => slot >= 5 && slot <= 9);

    const rodTypes: string[] = [];
    if (hasOldRod) rodTypes.push("Old");
    if (hasGoodRod) rodTypes.push("Good");
    if (hasSuperRod) rodTypes.push("Super");

    // If there's only one rod type, return it
    if (rodTypes.length === 1) {
      return `${rodTypes[0]} Rod`;
    }
  }

  // For other methods, return the capitalized method name
  return capitalize(method.trim());
}

/**
 * Gets an appropriate background color class for a consolidated encounter method
 *
 * @param method - The encounter method
 * @param slots - Array of slot numbers
 * @returns A Tailwind CSS class name for background color
 */
export function getConsolidatedMethodColor(
  method: string,
  slots?: number[],
): string {
  // Handle specific fishing rod methods
  if (method === "fishing_old") {
    return "bg-sky-600"; // Old Rod
  } else if (method === "fishing_good") {
    return "bg-cyan-700"; // Good Rod
  } else if (method === "fishing_super") {
    return "bg-teal-600"; // Super Rod
  }

  if (method === "fishing" && slots && slots.length > 0) {
    const slot = slots[0]; // Just use the first slot
    return getMethodColor(method, slot);
  }

  // For other methods, use the standard color
  return getMethodColor(method, slots ? slots[0] : 0);
}
