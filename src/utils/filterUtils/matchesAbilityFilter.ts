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
    randomizeAbility(pokemon.index, i, abilityWhitelist, isRandomiserActive)
  );
  return randomisedAbilities.some((id) => id === abilityId);
}
