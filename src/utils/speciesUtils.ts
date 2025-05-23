import speciesData from "../data/speciesData.json";
import { Pokemon, SpeciesData } from "@/types";

// Type the imported data properly
const typedSpeciesData = speciesData as SpeciesData;

export function getSpeciesName(speciesId: number): string {
  const s = typedSpeciesData[speciesId.toString()];
  return s?.speciesName ?? "None";
}

export function getNameKey(speciesId: number): string {
  const s = typedSpeciesData[speciesId.toString()];
  return s?.nameKey ?? "None";
}

export function getSpeciesData(speciesId: number): Pokemon {
  if (speciesId === undefined || speciesId === null) {
    throw new Error(`Invalid speciesId: ${speciesId}`);
  }
  const s = typedSpeciesData[speciesId.toString()];
  if (!s) throw new Error(`Species ${speciesId} not found`);
  return s;
}

export function hasForms(pokemon: Pokemon): boolean {
  const siblings = pokemon.siblings || [];
  return !!siblings
}

export function getBaseForm(pokemon: Pokemon): Pokemon {
  if (pokemon.baseForm) return typedSpeciesData[pokemon.baseForm];
  return pokemon;
}
