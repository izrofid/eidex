import { useState } from "react";
import { Ability, Pokemon, StatArray } from "../../types";
import CloseButton from "../CloseButton";
import EvolutionView from "../EvolutionView/EvolutionView";
import AbilityBox from "./AbilityBox";
import { getEvolutionaryFamily } from "@/utils/evoFamily";
import AbilityDescription from "./AbilityDescription";
import TabbedInterface from "./TabbedInterface";
import TypeMatchup from "./TypeMatchup";
import getSprite from "@/utils/getSprite";
import { buildPokemonMoveTabs } from "./Learnset/learnsetTabs";
import { TypeBadge } from "../TypeBadges/TypeBadge";
import StatBars from "./StatBars";
import { FormeView } from "../FormeView/FormeView";
import { hasForms } from "@/utils/speciesData";
import { Switch } from "@headlessui/react";

type PokemonModalProps = PokemonViewProps & {
  onClose: () => void;
  onChangeShiny: () => void;
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
        className="h-[128px] w-[128px] object-contain"
      />
      <div className="mt-2 flex flex-row gap-1">
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
      <div className="mt-2 flex w-full">
        <StatBars stats={pokemon.stats as StatArray} />
      </div>
      <div className="my-2 mt-6 flex w-full flex-col">
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
        {hasForms(pokemon) && (
          <div className="mb-3">
            <FormeView
              pokemon={pokemon}
              isShiny={isShiny}
              onClickPokemon={onSelectPokemon}
            />
          </div>
        )}
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
  onChangeShiny,
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
        <span className="self-center absolute left-3 flex flex-row gap-1 items-center">
          {" "}
          <img src="shinycharm.png" className="object-contain h-7 w-7"></img>
          <Switch
            checked={isShiny}
            onChange={onChangeShiny}
            className="data-checked:bg-emerald-500 group inline-flex h-5 w-10 items-center rounded-full bg-gray-500 transition cursor-pointer"
          >
            <span className="group-data-checked:translate-x-6 size-3 translate-x-1 rounded-full bg-white transition" />
          </Switch>
        </span>
        <span className="self-center absolute right-3 flex flex-row gap-1 items-center"><CloseButton onClick={onClose} /></span>
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
