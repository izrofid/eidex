import { Pokemon } from "../../types";
import { randomizeAbility } from "@/randomiser/randomiser";
import { abilityWhitelist } from "@/randomiser/abilityWhitelist";

export function matchesAbilityFilter(
  pokemon: Pokemon,
  isRandomiserActive: boolean,
  abilityId?: number
): boolean {
  if (!abilityId) return true;
  const randomisedAbilities = pokemon.abilities.map((_, i) =>
    randomizeAbility(pokemon.speciesId, i, abilityWhitelist, isRandomiserActive)
  );
  return randomisedAbilities.some((ability) => ability[0] === abilityId);
}
