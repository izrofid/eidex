import { useState } from "react";
import { Ability, Pokemon, StatArray } from "../../types";
import CloseButton from "../CloseButton";
import EvolutionView from "./EvolutionView/EvolutionView";
import AbilityBox from "./Ability/AbilityBox";
import { getEvolutionaryFamily } from "@/utils/evoFamily";
import AbilityDescription from "./Ability/AbilityDescription";
import TypeMatchup from "./TypeMatchup";
import PokemonLearnset from "./Learnset/PokemonLearnset";
import { TypeBadge } from "../TypeBadges/TypeBadge";
import StatBars from "./StatBars";
import { FormeView } from "../FormeView/FormeView";
import { getSpeciesData, hasForms } from "@/utils/speciesUtils";
import { useUIStore } from "@/stores/uiStore";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import SpriteImage from "../SpriteImage";
import { abilityWhitelist } from "@/randomiser/abilityWhitelist";
import { randomizeAbility } from "@/randomiser/randomiser";
import ShinyToggle from "../AppHeader/ShinyToggle";
import RandomiserSwitch from "../AppHeader/RandomiserSwitch";
import { useRandomiserStore } from "@/stores/randomiserStore";
import PokemonLocations from "./PokemonLocations";

function PokemonView({ pokemon }: { pokemon: Pokemon }) {
  const { isShiny, setSelectedPokemon } = useUIStore();
  const screenWidth = useScreenWidth();
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);
  const isRandomiserActive = useRandomiserStore(
    (state) => state.isRandomiserActive,
  );
  const evoFamily = getEvolutionaryFamily(pokemon.speciesId);

  const handleSelectPokemon = (pokemonId: number) => {
    const pokemon: Pokemon = getSpeciesData(pokemonId);
    setSelectedPokemon(pokemon);
  };

  const randomisedAbilities = pokemon.abilities.map((_, i) =>
    randomizeAbility(
      pokemon.speciesId,
      i,
      abilityWhitelist,
      isRandomiserActive,
    ),
  );

  return (
    <div className="flex w-full flex-col items-center">
      <SpriteImage pokemon={pokemon} mult={2} className="rendering-pixelated" />
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
        <div className="text-md font-pixel text-gray-400">#{pokemon.dexId}</div>
      </div>
      <div className="mt-2 flex w-full">
        <StatBars stats={pokemon.stats as StatArray} />
      </div>
      <div className="mt-6 flex w-full flex-col">
        <AbilityBox key={pokemon.speciesId} abilities={randomisedAbilities} />
        <div className="mt-2 w-full">
          <AbilityDescription
            selectedAbility={selectedAbility}
            onClose={() => setSelectedAbility(null)}
          />
        </div>
        <div className="mt-0">
          <PokemonLocations pokemonId={pokemon.speciesId} />
        </div>
        <div className="mt-3">
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
        <PokemonLearnset pokemon={pokemon} />
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
        className="w-xl no-scrollbar relative mx-2 my-5 h-[95dvh] max-h-screen justify-normal overflow-y-auto rounded-lg border border-gray-100 bg-zinc-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex flex-row justify-between">
          <span className="flex flex-row gap-2">
            <ShinyToggle
              isShiny={isShiny}
              toggleShiny={toggleShiny}
            ></ShinyToggle>
            <RandomiserSwitch />
          </span>
          <span className="flex flex-row items-center gap-1 self-center"></span>
          <CloseButton onClick={closeModal} />
        </span>
        <PokemonView pokemon={selectedPokemon} />
      </div>
    </div>
  );
}

export default PokemonModal;
