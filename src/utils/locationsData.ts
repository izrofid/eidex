import speciesLabelMap from "@/data/speciesLabelMap.json";
import wildEncounters from "@/data/wildEncounters.json";
import { capitalize, removeSuffix } from "./miscUtils";

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

    const encounters = wildEncounters[speciesLabel as keyof typeof wildEncounters] || [];
    return encounters.filter(
        (encounter) => !encounter.map?.includes("UNUSED_RUBY_SAPPHIRE")
    );
}

export function getAllEncounters() {
  return wildEncounters;
}

export { encountersLookupMap };

export function getMethodName(method: string, slot: number) {
  if (method === "fishing_mons") {
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

export function cleanLocation(location: string)
{
    const suffixes = ["Town", "City", "Island"]

    return removeSuffix(location, suffixes)
}

export function getMethodColor(method: string, slot: number) {
    if (method === "fishing_mons") {
        if (slot === 0 || slot === 1) {
            return "#4A90E2"; // Old Rod - blue
        } else if (slot >= 2 && slot <= 4) {
            return "#50E3C2"; // Good Rod - teal
        } else if (slot >= 5 && slot <= 9) {
            return "#9B59B6"; // Super Rod - purple
        }
    }
    if (method === "walk") {
        return "#2E8B57"; // Walk - green
    }
    if (method === "Rock Smash") {
        return "#D0021B"; // Rock Smash - red
    }
    if (method === "surf") {
        return "#3148f5"; // Surf
    }
    return "#CCCCCC"; // Default color - grey
}