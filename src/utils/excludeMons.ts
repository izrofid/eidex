import { Pokemon } from "@/types";
import { getSpeciesData } from "./speciesUtils";

const excludeMons = (pokemon: Pokemon | null | undefined): boolean => {

  return excludeForms(pokemon?.forms) || excludeCosmeticForms(pokemon)
};

const excludeCosmeticForms = (pokemon: Pokemon | null | undefined): boolean => {
  if (!pokemon) return false;
  
  const pokemonWithCosmeticForms: number[] = [];
  const nonCosmeticSiblings = [1522];

  // Get siblings data for Pokemon with cosmetic forms
  const cosmeticForms = pokemonWithCosmeticForms
    .map((id) => {
      const p = getSpeciesData(id);
      return p?.siblings || [];
    })
    .flat()
    .filter((id) => !nonCosmeticSiblings.includes(id))
    .filter((id) => !pokemonWithCosmeticForms.includes(id));

  // Ensure the Pokemon itself is not excluded
  return cosmeticForms.includes(pokemon.speciesId) && !pokemonWithCosmeticForms.includes(pokemon.speciesId);
};

const excludeForms = (forms: string[] | null | undefined): boolean => {
  const bannedForms = ["totem", "gigantamax", "tera"];
  if (!forms) return false;
  return forms.some((form) => bannedForms.includes(form));
}

export default excludeMons;
