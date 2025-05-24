import { Pokemon } from "@/types";
import React from "react";
import speciesData from "@/data/speciesData.json";
import SpriteImage from "../SpriteImage";
import excludeForms from "@/utils/excludeForms";
import { hasForms } from "@/utils/speciesUtils"; // Import hasForms

interface FormeViewProps {
  pokemon: Pokemon;
  isShiny: boolean;
  onClickPokemon: (pokemonId: number) => void;
}

export const FormeView: React.FC<FormeViewProps> = ({
  pokemon,
  onClickPokemon,
}) => {
  // Find all alternate forms
  const altFormes: Pokemon[] = Object.values(speciesData).filter(
    (p: Pokemon) => p.dexId === pokemon.dexId && !excludeForms(p.forms),
  );

  // Hide if only one form exists
  if (!hasForms(pokemon) || altFormes.length <= 1) {
    return null;
  }

  return (
    <div className="neutral-box flex flex-row flex-wrap justify-evenly gap-2 rounded-md p-2">
      {altFormes.map((form: Pokemon) => (
        <div
          key={form.speciesId}
          className="w-25 flex cursor-pointer flex-col items-center rounded-md bg-zinc-700 p-2"
          onClick={() => onClickPokemon(form.speciesId)}
        >
          <SpriteImage pokemon={form} />
          <span className="font-pixel text-center text-xs text-gray-200">
            {form.nameKey}
          </span>
        </div>
      ))}
    </div>
  );
};
