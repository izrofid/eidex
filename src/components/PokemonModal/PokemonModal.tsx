import { useState } from "react";
import { Ability, Pokemon, StatArray } from "../../types";
import CloseButton from "../CloseButton";
import EvolutionView from "../EvolutionView/EvolutionView";
import AbilityBox from "./AbilityBox";
import { getEvolutionaryFamily } from "@/utils/evoFamily";
import AbilityDescription from "./AbilityDescription";
import TabbedInterface from "./TabbedInterface";
import TypeMatchup from "./TypeMatchup";
import { buildPokemonMoveTabs } from "./Learnset/learnsetTabs";
import { TypeBadge } from "../TypeBadges/TypeBadge";
import StatBars from "./StatBars";
import { FormeView } from "../FormeView/FormeView";
import { getSpeciesData, hasForms } from "@/utils/speciesData";
import { Switch } from "@headlessui/react";
import { useUIStore } from "@/stores/uiStore";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import SpriteImage from "../SpriteImage";

function PokemonView({ pokemon }: { pokemon: Pokemon }) {
  const { isShiny, setSelectedPokemon } = useUIStore();
  const screenWidth = useScreenWidth();
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);
  const evoFamily = getEvolutionaryFamily(pokemon.index);
  const tabsData = buildPokemonMoveTabs(pokemon);

  const handleSelectPokemon = (pokemonId: number) => {
    const pokemon: Pokemon = getSpeciesData(pokemonId);
    setSelectedPokemon(pokemon);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <SpriteImage pokemon={pokemon} mult={2} className="rendering-pixelated"/>
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
            onClickPokemon={handleSelectPokemon}
          />
        </div>
        {hasForms(pokemon) && (
          <div className="mb-3">
            <FormeView
              pokemon={pokemon}
              isShiny={isShiny}
              onClickPokemon={handleSelectPokemon}
            />
          </div>
        )}
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

function PokemonModal() {
  const { selectedPokemon, isShiny, toggleShiny, closeModal } = useUIStore();

  if (!selectedPokemon) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md"
      onClick={closeModal}
    >
      <div
        className="w-xl no-scrollbar relative my-5 h-[95dvh] max-h-screen justify-normal overflow-y-auto rounded-lg border border-gray-100 bg-zinc-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="absolute left-3 flex flex-row items-center gap-1 self-center">
          {" "}
          <img
            src="shinycharm.png"
            className="h-7 w-7 object-contain"
            alt="Shiny charm"
          />
          <Switch
            checked={isShiny}
            onChange={toggleShiny}
            className="data-checked:bg-emerald-500 group inline-flex h-5 w-10 cursor-pointer items-center rounded-full bg-gray-500 transition"
          >
            <span className="group-data-checked:translate-x-6 size-3 translate-x-1 rounded-full bg-white transition" />
          </Switch>
        </span>
        <span className="absolute right-3 flex flex-row items-center gap-1 self-center">
          <CloseButton onClick={closeModal} />
        </span>
        <PokemonView pokemon={selectedPokemon} />
      </div>
    </div>
  );
}

export default PokemonModal;
