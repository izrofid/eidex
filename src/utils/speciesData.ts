import speciesData from "../data/speciesData.json";

export function getSpeciesName(speciesId: number): string {
  const species = speciesData.find((species) => species.index === speciesId);
  if (!species) return "None";
  return species.speciesName || "None";
}

export function getNameKey(speciesId: number): string {
  const species = speciesData.find((species) => species.index === speciesId);
  if (!species) return "None";
  return species.nameKey || "None";
}
