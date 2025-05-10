import abilities from "../data/abilityData.json";

export type AbilityObject = {
  id: number;
  name: string;
  shortName: string;
  description: string;
};

export function getAbilityName(abilityId: number): string {
  const ability = abilities.find(ability => ability.id === abilityId);
  if (!ability) return "None";
  return ability.name || "None";
}

export function getAbilityNameShort(abilityId: number): string {
  const ability = abilities.find(ability => ability.id === abilityId);
  if (!ability) return "None";
  if (ability.shortName) {
    return ability.shortName;
  }
  return ability.name || "None";
}

// function to export the ability description as a string given id and index
export function getAbilityDescription(abilityId: number): string {
  const ability = abilities.find(ability => ability.id === abilityId);
  if (!ability) return "None";
  return ability.description || "None";
}