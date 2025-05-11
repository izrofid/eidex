import { Pokemon } from "@/types";
import React from "react";
import speciesData from "@/data/speciesData.json";
import getSprite from "@/utils/getSprite";
import excludeForms from "@/utils/excludeForms";

interface FormeViewProps {
  pokemon: Pokemon;
  isShiny: boolean;
  onClickPokemon: (pokemonId: number) => void;
}

export const FormeView: React.FC<FormeViewProps> = ({
  pokemon,
  isShiny,
  onClickPokemon,
}) => {
  const altFormes: Pokemon[] = speciesData.filter(
    (p: Pokemon) => p.dexId === pokemon.dexId && !excludeForms(p.forms)
  );

  return (
    <div className="neutral-box flex flex-row justify-evenly gap-2 rounded-md p-2">
      {altFormes.map((form: Pokemon) => (
        <div
          key={form.index}
          className="w-25 flex cursor-pointer flex-col items-center rounded-md bg-zinc-700 p-2"
          onClick={() => onClickPokemon(form.index)}
        >
          <img
            className="mx-auto h-[64px] w-[64px] object-contain"
            alt={form.nameKey}
            src={getSprite(form.index, isShiny)}
          />
          <span className="text-center text-xs font-pixel text-gray-200">
            {form.nameKey}
          </span>
        </div>
      ))}
    </div>
  );
};
