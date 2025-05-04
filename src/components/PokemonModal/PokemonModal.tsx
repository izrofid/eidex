import { Pokemon, Ability } from "../../types";
import spritesData from "../../data/sprites.json";
import shinySpritesData from "../../data/shinySprites.json";
import { useState } from "react";
import TabbedInterface from "./TabbedInterface";
import EvolutionBox from "./EvolutionBox";
import CloseButton from "../CloseButton";
import AbilityBadge from "./AbilityBadge";
import AbilityDescription from "./AbiltyDescription";
import { generateTabsData } from "./tabsData";

import TypeMatchup from "./TypeMatchup";

type PokemonModalProps = {
  pokemon: Pokemon | null;
  onClose: () => void;
  isShiny?: boolean;
};

function PokemonView({
  pokemon,
  isShiny,
}: {
  pokemon: Pokemon;
  isShiny: boolean;
}) {
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);

  const shinySprite = `data:image/png;base64,${shinySpritesData[pokemon.ID.toString() as keyof typeof shinySpritesData]}`;
  const regularSprite = `data:image/png;base64,${spritesData[pokemon.ID.toString() as keyof typeof spritesData]}`;

  const displaySprite = isShiny ? shinySprite : regularSprite;
  const reorderedAbilities = [...pokemon.abilities.slice(1)];
  const hiddenAbility = pokemon.abilities[0];

  const handleAbilityClick = (ability: Ability) => {
    setSelectedAbility(ability);
  };

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
        <div className="border-3 border-fieldset-border relative flex w-full flex-row justify-evenly rounded-sm px-3 py-7 text-center">
          {/* Abilities Label */}
          <div className="w-19 font-pkmnem-short absolute left-6 top-0 flex translate-y-[-50%] select-none items-center justify-center rounded border border-gray-300 bg-blue-900 px-4 py-1 text-center text-xs font-bold uppercase text-gray-100">
            Abilities
          </div>

          {reorderedAbilities.map((ability) => (
            <AbilityBadge
              key={ability[0]}
              ability={ability}
              onClick={handleAbilityClick}
            />
          ))}
          <AbilityBadge
            ability={hiddenAbility}
            onClick={handleAbilityClick}
            isHidden
          />
        </div>
        <div className="w-full">
          <AbilityDescription
            selectedAbility={selectedAbility}
            onClose={() => setSelectedAbility(null)}
          />
        </div>
        <div><EvolutionBox pokemon={pokemon}/></div>
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
        <PokemonView pokemon={pokemon} isShiny={isShiny} />
      </div>
    </div>
  );
}
