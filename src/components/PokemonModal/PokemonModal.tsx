import { Pokemon, StatArray } from "../../types";
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
  const { isShiny, setSelectedPokemon, selectedAbility, setSelectedAbility } = useUIStore();
  const screenWidth = useScreenWidth();
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
    <div className="flex w-full flex-col items-center space-y-4">
      {/* Header section - Pokemon sprite and basic info */}
      <div className="flex flex-col items-center space-y-2">
        <SpriteImage pokemon={pokemon} mult={2} className="rendering-pixelated" />
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
          <div className="text-md font-pixel text-gray-400">#{pokemon.dexId}</div>
        </div>
      </div>

      {/* Stats section */}
      <div className="flex w-full">
        <StatBars stats={pokemon.stats as StatArray} />
      </div>
      
      {/* Details section */}
      <div className="flex w-full flex-col space-y-4">
        {/* Abilities section */}
        <div className="space-y-2">
          <AbilityBox key={pokemon.speciesId} abilities={randomisedAbilities} />
          {selectedAbility && (
            <AbilityDescription
              selectedAbility={selectedAbility}
              onClose={() => setSelectedAbility(null)}
            />
          )}
        </div>

        {/* Locations section */}
        <PokemonLocations pokemonId={pokemon.speciesId} />
        
        {/* Evolution section */}
        <EvolutionView
          pokemon={pokemon}
          family={evoFamily}
          onClickPokemon={handleSelectPokemon}
        />
        
        {/* Forms section (conditional) */}
        {hasForms(pokemon) && (
          <FormeView
            pokemon={pokemon}
            isShiny={isShiny}
            onClickPokemon={handleSelectPokemon}
          />
        )}
        
        {/* Type matchup section */}
        <div className="flex flex-wrap text-gray-100">
          <TypeMatchup pokemon={pokemon} />
        </div>
      </div>
      
      {/* Learnset section (at bottom) */}
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
