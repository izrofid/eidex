import abilities from "../data/abilityData.json";
import { abilityWhitelist } from "@/randomiser/abilityWhitelist";
import { randomizeAbility } from "@/randomiser/randomiser";
import { useRandomiserStore } from "@/stores/randomiserStore";
import { getSpeciesData } from "./speciesData";

export type AbilityObject = {
  id: number;
  name: string;
  shortName: string;
  description: string;
};

// Create lookup table when module is loaded
const abilityLookup = new Map<number, AbilityObject>();
abilities.forEach((ability) => {
  abilityLookup.set(ability.id, ability as AbilityObject);
});

// Default ability for when nothing is found
const defaultAbility: AbilityObject = {
  id: 0,
  name: "None",
  shortName: "None",
  description: "No ability found",
};

export function getAbilityName(abilityId: number): string {
  const ability = abilityLookup.get(abilityId);
  if (!ability) return "None";
  return ability.name || "None";
}

export function getAbilityNameShort(abilityId: number): string {
  const ability = abilityLookup.get(abilityId);
  if (!ability) return "None";
  if (ability.shortName) {
    return ability.shortName;
  }
  return ability.name || "None";
}

export function getAbilityDescription(abilityId: number): string {
  const ability = abilityLookup.get(abilityId);
  if (!ability) return "None";
  return ability.description || "None";
}

export function getRandomisedAbility(
  species: number,
  abilityNum: number = 0,
): AbilityObject {
  const isRandomiserActive = useRandomiserStore((state) => state.isRandomiserActive);
  const randomAbilityId = randomizeAbility(
    species,
    abilityNum,
    abilityWhitelist,
    isRandomiserActive,
  );

  const abilityId = getSpeciesData(species).abilities[abilityNum];

  const idToUse = isRandomiserActive ? randomAbilityId : abilityId;
  const ability = abilityLookup.get(idToUse);
  return ability || defaultAbility;
}
