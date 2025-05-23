import abilityData from "../data/abilityData.json";
import { getBaseForm, getSpeciesData } from "./speciesUtils";

export type AbilityObject = {
  abilityId: number;
  name: string;
  shortName?: string;
  description: string;
};

type AbilityLookup = {
  [key: string]: AbilityObject;
};



const abilityLookup = abilityData as AbilityLookup;

export function getAbilityName(abilityId: number): string {
  const ability = abilityLookup[abilityId];
  if (!ability) return "None";
  return ability.name || "None";
}

export function getAbilityNameShort(abilityId: number): string {
  const ability = abilityLookup[abilityId];
  if (!ability) return "None";
  if (ability.shortName) {
    return ability.shortName;
  }
  return ability.name || "None";
}

export function getAbilityDescription(abilityId: number): string {
  const ability = abilityLookup[abilityId];
  if (!ability) return "None";
  return ability.description || "None";
}


export function isAbilityAvialable(speciesId: number, slot: number, isRandomiserActive: boolean = false): boolean {
  if(!isRandomiserActive){
    return true
  }
  const pokemon = getSpeciesData(speciesId)

  if(pokemon.forms?.includes("mega")){
    const baseForm = getBaseForm(pokemon)
    return baseForm.abilities[slot] !== 0;
  }

  return pokemon.abilities[slot] !== 0;

}
