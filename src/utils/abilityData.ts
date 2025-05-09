import abilities from "../data/abilityData.json";

export type AbilityObject = {
  id: number;
  name: string;  // Changed from "names" to "name" to match JSON structure
  description: string;
};

export function getAbilityName(abilityId: number): string {
  const ability = abilities.find(ability => ability.id === abilityId);
  if (!ability) return "None";
  return ability.name || "None";
}

// function to export the ability description as a string given id and index
export function getAbilityDescription(abilityId: number): string {
  const ability = abilities.find(ability => ability.id === abilityId);
  if (!ability) return "None";
  return ability.description || "None";
}