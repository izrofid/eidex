import { useState } from "react";
import { Ability, Pokemon } from "../../types";
import CloseButton from "../CloseButton";
import EvolutionView from "../EvolutionView/EvolutionView";
import AbilityBox from "./AbilityBox";
import { getEvolutionaryFamily } from "@/utils/evoFamily";
import AbilityDescription from "./AbilityDescription";
import TabbedInterface from "./TabbedInterface";
import TypeMatchup from "./TypeMatchup";
import getSprite from "@/utils/getSprite";
import { buildPokemonMoveTabs } from "./learnsetTabs";
import { TypeBadge } from "../TypeBadges/TypeBadge";

type PokemonModalProps = PokemonViewProps & {
  onClose: () => void;
};
type PokemonViewProps = {
  pokemon: Pokemon | null;
  isShiny?: boolean;
  screenWidth: string;
  onSelectPokemon: (pokemonId: number) => void;
};

function PokemonView({
  pokemon,
  isShiny,
  screenWidth,
  onSelectPokemon,
}: {
  pokemon: Pokemon;
  isShiny: boolean;
  screenWidth: string;
  onSelectPokemon: (pokemonId: number) => void;
}) {
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);

  const displaySprite = getSprite(pokemon.index, isShiny);

  const evoFamily = getEvolutionaryFamily(pokemon.index);

  const tabsData = buildPokemonMoveTabs(pokemon);

  return (
    <div className="flex w-full flex-col items-center">
      <img
        src={displaySprite}
        alt={pokemon.speciesName}
        className="h-[128px] w-[128px] object-contain py-0"
      />
      <div className="flex flex-row gap-1">
        {pokemon.types.map((typeId: number, index: number) => (
          <div key={index}>
            <TypeBadge typeId={typeId} screenWidth={screenWidth} />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="font-pixel text-xl font-bold text-gray-200">
          {pokemon.nameKey}
        </div>
        <div className="text-md font-pixel text-gray-400">#{pokemon.index}</div>
      </div>
      <div className="my-2 flex w-full flex-col">
        <AbilityBox key={pokemon.index} abilities={pokemon.abilities} />
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
      {/* <div className="w-full">
        <EvolutionBox
        pokemon={pokemon}
        />
      </div> */}
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
  screenWidth,
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
          screenWidth={screenWidth}
          onSelectPokemon={onSelectPokemon}
        />
      </div>
    </div>
  );
}
