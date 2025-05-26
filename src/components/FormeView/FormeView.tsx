import { Pokemon } from "@/types";
import React from "react";
import speciesData from "@/data/speciesData.json";
import SpriteImage from "../SpriteImage";
import excludeForms from "@/utils/excludeForms";
import { hasForms, getSpeciesData } from "@/utils/speciesUtils";
import { useUIStore } from "@/stores/uiStore";

interface FormeViewProps {
  pokemon: Pokemon;
}

export const FormeView: React.FC<FormeViewProps> = ({
  pokemon,
}) => {
  const { setSelectedPokemon, setSelectedAbility } = useUIStore();
  
  const handleSelectPokemon = (pokemonId: number) => {
    const newPokemon = getSpeciesData(pokemonId);
    
    // Reset selected ability when changing Pokémon
    if (pokemonId !== pokemon.speciesId) {
      setSelectedAbility(null);
    }
    
    setSelectedPokemon(newPokemon);
  };
  // Find all alternate forms
  const altFormes: Pokemon[] = Object.values(speciesData).filter(
    (p: Pokemon) => p.dexId === pokemon.dexId && !excludeForms(p.forms),
  );

  // Hide if only one form exists
  if (!hasForms(pokemon) || altFormes.length <= 1) {
    return null;
  }

  return (
    <div className="flex flex-row flex-wrap justify-evenly gap-2 rounded-md p-2">
      {altFormes.map((form: Pokemon) => (
        <div
          key={form.speciesId}
          className="flex cursor-pointer flex-col items-center rounded-md bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-500 p-2"
          onClick={() => handleSelectPokemon(form.speciesId)}
        >
          <SpriteImage pokemon={form} />
        </div>
      ))}
    </div>
  );
};
