import speciesData from "../data/speciesData.json";
import { Pokemon } from "@/types";

// build lookup tables once
const speciesByIndex: Record<number, Pokemon> = {};
const speciesByDex: Record<number, Pokemon[]> = {};

for (const s of speciesData) {
  speciesByIndex[s.index] = s;
  if (!speciesByDex[s.dexId]) speciesByDex[s.dexId] = [];
  speciesByDex[s.dexId].push(s);
}

export function getSpeciesName(speciesId: number): string {
  const s = speciesByIndex[speciesId];
  return s?.speciesName ?? "None";
}

export function getNameKey(speciesId: number): string {
  const s = speciesByIndex[speciesId];
  return s?.nameKey ?? "None";
}

export function getSpeciesData(speciesId: number): Pokemon {
  const s = speciesByIndex[speciesId];
  if (!s) throw new Error(`Species ${speciesId} not found`);
  return s;
}

export function hasForms(pokemon: Pokemon): boolean {
  const forms = speciesByDex[pokemon.dexId] || [];
  return forms.length > 1;
}

export function getBaseForm(pokemon: Pokemon): Pokemon {
  const forms = speciesByDex[pokemon.dexId] || [];
  const baseForm = forms.find(f => f.formId === 0);
  if (!baseForm) throw new Error(`Base form not found for dexId ${pokemon.dexId}`);
  return baseForm;
}