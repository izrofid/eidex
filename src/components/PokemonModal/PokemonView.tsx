import { Pokemon, StatArray } from "../../types";
import AbilityBox from "./Ability/AbilityBox";
import AbilityDescription from "./Ability/AbilityDescription";
import { TypeBadge } from "../TypeBadges/TypeBadge";
import StatBars from "./MiscModal/StatBars";
import SpriteImage from "../MiscUI/SpriteImage";
import { getEvolutionaryFamily } from "@/utils/evoFamily";
import { hasForms, hasItems } from "@/utils/speciesUtils";
import { useUIStore } from "@/stores/uiStore";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { abilityWhitelist } from "@/randomiser/abilityWhitelist";
import { randomizeAbility } from "@/randomiser/randomiser";
import { useRandomiserStore } from "@/stores/randomiserStore";
import EvolutionView from "./EvolutionView/EvolutionView";
import PokemonLocations from "./MiscModal/PokemonLocations";
import { FormeView } from "../FormeView/FormeView";
import TypeMatchup from "./MiscModal/TypeMatchup";
import PokemonLearnset from "./Learnset/PokemonLearnset";
import React from "react";
import { isObtainable } from "@/utils/locationsData";
import ItemView from "./MiscModal/ItemView";

interface PokemonViewProps {
  pokemon: Pokemon;
}

const PokemonView: React.FC<PokemonViewProps> = ({ pokemon }) => {
  const selectedAbility = useUIStore((state) => state.selectedAbility);
  const screenWidth = useScreenWidth();
  const isRandomiserActive = useRandomiserStore(
    (state) => state.isRandomiserActive,
  );
  const evoFamily = getEvolutionaryFamily(pokemon.speciesId);

  const randomisedAbilities = pokemon.abilities.map((_, i) =>
    randomizeAbility(
      pokemon.speciesId,
      i,
      abilityWhitelist,
      isRandomiserActive,
    ),
  );

  return (
    <div className="flex w-full flex-col items-center space-y-6">
      {/* Header section - Pokemon sprite and basic info */}
      <div className="flex flex-col items-center space-y-3">
        <div>
          <SpriteImage
            pokemon={pokemon}
            mult={2}
            className="rendering-pixelated"
          />
        </div>
        <div className="mt-2 flex flex-row gap-1">
          {pokemon.types.map((typeId: number, index: number) => (
            <div key={index}>
              <TypeBadge typeId={typeId} screenWidth={screenWidth} />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="font-chakra text-xl font-bold text-gray-200">
            {pokemon.nameKey}
          </div>
          <div className="text-md font-pixel text-gray-400">
            #{pokemon.dexId}
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="flex w-full">
        <StatBars stats={pokemon.stats as StatArray} />
      </div>

      {/* Details section */}
      <div className="flex w-full flex-col space-y-6">
        {/* Abilities section */}
        <div className="bg-card-backdrop space-y-4 rounded-xl p-5 shadow-md">
          <h3 className="font-chakra mb-3 text-lg font-medium text-gray-100">
            Abilities
          </h3>
          <AbilityBox key={pokemon.speciesId} abilities={randomisedAbilities} />
          {selectedAbility && <AbilityDescription />}
        </div>

        {/* Locations section */}
        {isObtainable(pokemon.speciesId) && (
          <div className="bg-card-backdrop rounded-xl p-5 shadow-md">
            <h3 className="font-chakra mb-3 text-lg font-medium text-gray-100">
              Locations
            </h3>
            <PokemonLocations pokemonId={pokemon.speciesId} />
          </div>
        )}

        {/* Evolution section */}
        <div className="bg-card-backdrop rounded-xl p-5 shadow-md">
          <h3 className="font-chakra mb-3 text-lg font-medium text-gray-100">
            Evolution
          </h3>
          <EvolutionView pokemon={pokemon} family={evoFamily} />
        </div>

        {/* Forms section */}
        {hasForms(pokemon) && (
          <div className="bg-card-backdrop rounded-xl p-5 shadow-md">
            <h3 className="font-chakra mb-3 text-lg font-medium text-gray-100">
              Forms
            </h3>
            <FormeView pokemon={pokemon} />
          </div>
        )}

        {/* Held items section */}
        {hasItems(pokemon) && (
          <div className="bg-card-backdrop rounded-xl p-5 shadow-md">
            <h3 className="font-chakra mb-3 text-lg font-medium text-gray-100">
              Held Items
            </h3>
            <ItemView pokemon={pokemon} />
          </div>
        )}

        {/* Type matchup section */}
        <div className="bg-card-backdrop rounded-xl p-5 shadow-md">
          <h3 className="font-chakra mb-3 text-lg font-medium text-gray-100">
            Type Matchups
          </h3>
          <div className="flex flex-wrap text-gray-100">
            <TypeMatchup pokemon={pokemon} />
          </div>
        </div>

        {/* Learnset section */}
        <div className="bg-card-backdrop rounded-xl p-5 shadow-md">
          <h3 className="font-chakra mb-3 text-lg font-medium text-gray-100">
            Learnset
          </h3>
          <PokemonLearnset pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
};

export default PokemonView;
