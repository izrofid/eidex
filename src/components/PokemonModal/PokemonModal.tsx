import { Pokemon, Ability } from "../../types";
import spritesData from "../../data/sprites.json";
import shinySpritesData from "../../data/shinySprites.json";
import { useState } from "react";
import TabbedInterface from "./TabbedInterface";

import CloseButton from "../CloseButton";
import AbilityBox from "./AbilityBox";
import AbilityDescription from "./AbilityDescription";
import { generateTabsData } from "./tabsData";
import { getEvolutionaryFamily } from "../../utils/evoFamily";
import EvolutionView from "../EvolutionView/EvolutionView";

import TypeMatchup from "./TypeMatchup";

type PokemonModalProps = PokemonViewProps & {
  onClose: () => void;
};
type PokemonViewProps = {
  pokemon: Pokemon | null;
  isShiny?: boolean;
  onSelectPokemon: (pokemonId: number) => void;
};

function PokemonView({
  pokemon,
  isShiny,
  onSelectPokemon,
}: {
  pokemon: Pokemon;
  isShiny: boolean;
  onSelectPokemon: (pokemonId: number) => void;
}) {
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);

  const shinySprite = `data:image/png;base64,${shinySpritesData[pokemon.ID.toString() as keyof typeof shinySpritesData]}`;
  const regularSprite = `data:image/png;base64,${spritesData[pokemon.ID.toString() as keyof typeof spritesData]}`;

  const displaySprite = isShiny ? shinySprite : regularSprite;
  const reorderedAbilities = [...pokemon.abilities.slice(1)];
  const hiddenAbility = pokemon.abilities[0];

  const evoFamily = getEvolutionaryFamily(pokemon.ID);

  const tabsData = generateTabsData(pokemon);

  return (
    <div className="flex w-full flex-col items-center gap-1">
      <img
        src={displaySprite}
        alt={pokemon.name}
        className="h-[128px] w-[128px] object-contain py-0"
      />
      <div className="flex items-center gap-3">
        <div className="font-pixel text-xl font-bold text-gray-200">
          {pokemon.name}
        </div>
        <div className="text-md font-pixel text-gray-400">#{pokemon.ID}</div>
      </div>
      <div className="my-2 flex w-full flex-col">
        <AbilityBox
          key={pokemon.ID}
          abilities={reorderedAbilities}
          hiddenAbility={hiddenAbility}
        />
        <div className="w-full">
          <AbilityDescription
            selectedAbility={selectedAbility}
            onClose={() => setSelectedAbility(null)}
          />
        </div>
        <div className="my-3">
          <EvolutionView
            pokemon={pokemon}
            family={evoFamily}
            isShiny={isShiny}
            onClickPokemon={onSelectPokemon}
          />
        </div>
        <div className="flex flex-wrap text-gray-100">
          <TypeMatchup pokemon={pokemon} />
        </div>
      </div>
      <div className="flex w-full flex-grow">
        <TabbedInterface tabs={tabsData} />
      </div>
    </div>
  );
}

export function PokemonModal({
  pokemon,
  onClose,
  isShiny = false,
  onSelectPokemon,
}: PokemonModalProps) {
  if (!pokemon) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-xl no-scrollbar relative my-5 h-[95dvh] max-h-screen justify-normal overflow-y-auto rounded-lg border border-gray-100 bg-zinc-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose} />
        <PokemonView
          pokemon={pokemon}
          isShiny={isShiny}
          onSelectPokemon={onSelectPokemon}
        />
      </div>
    </div>
  );
}
