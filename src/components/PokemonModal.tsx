import { Pokemon } from "../types";
import spritesData from "../data/sprites.json";
import shinySpritesData from "../data/shiny_sprites.json";
import { getAbilityName, getAbilityDescription } from "../utils/abilityData";
import { useState } from "react";
import TabbedInterface from "./TabbedInterface";

type PokemonModalProps = {
  pokemon: Pokemon | null;
  onClose: () => void;
  isShiny?: boolean;
};

function CloseButton({
  onClick,
  className = "",
  size = 24,
}: {
  onClick: () => void;
  className?: string;
  size?: number;
}) {
  return (
    <button
      className={`text-gray-400 hover:text-red-800 focus:outline-none ${className}`}
      onClick={onClick}
      aria-label="Close"
      type="button"
      style={{ lineHeight: 0 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-${size / 4} w-${size / 4}`}
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

function renderAbilities(
  abilities: number[][],
  getAbilityName: ([abilityId, abilityIndex]: [number, number]) => string,
  onAbilityClick: (ability: [number, number]) => void,
) {
  return abilities
    .filter((ability) => ability[0] !== 0)
    .map((ability) => (
      <div
        key={ability[0]}
        className="ability_badge cursor-pointer"
        onClick={() => onAbilityClick(ability as [number, number])}
      >
        {getAbilityName(ability as [number, number])}
      </div>
    ));
}

function renderHiddenAbility(
  hiddenAbility: number[],
  getAbilityName: ([abilityId, abilityIndex]: [number, number]) => string,
  onAbilityClick: (ability: [number, number]) => void,
) {
  if (hiddenAbility[0] === 0) return null;
  return (
    <div
      className="ability_badge cursor-pointer bg-pink-700"
      onClick={() => onAbilityClick(hiddenAbility as [number, number])}
    >
      {getAbilityName(hiddenAbility as [number, number])}
    </div>
  );
}

function renderAbilityDescription(
  selectedAbility: [number, number] | null,
  getAbilityName: ([abilityId, abilityIndex]: [number, number]) => string,
  getAbilityDescription: ([abilityId, abilityIndex]: [
    number,
    number,
  ]) => string,
  onClose?: () => void,
) {
  if (!selectedAbility) return null;
  return (
    <div className="min-h-19 relative mt-4 w-full rounded bg-neutral-700 p-2 text-gray-200 shadow">
      <div className="font-bold">{getAbilityName(selectedAbility)}</div>
      {onClose && (
        <CloseButton
          onClick={onClose}
          size={16}
          className="absolute right-1 top-2"
        />
      )}
      <div className="whitespace-normal break-words text-sm">
        {getAbilityDescription(selectedAbility)}
      </div>
    </div>
  );
}

function PokemonView({
  pokemon,
  isShiny,
}: {
  pokemon: Pokemon;
  isShiny: boolean;
}) {
  const [selectedAbility, setSelectedAbility] = useState<
    [number, number] | null
  >(null);

  const shinySprite = `data:image/png;base64,${shinySpritesData[pokemon.ID.toString() as keyof typeof shinySpritesData]}`;
  const regularSprite = `data:image/png;base64,${spritesData[pokemon.ID.toString() as keyof typeof spritesData]}`;

  const displaySprite = isShiny ? shinySprite : regularSprite;
  const reorderedAbilities = [...pokemon.abilities.slice(1)];
  const hiddenAbility = pokemon.abilities[0];

  const handleAbilityClick = (ability: [number, number]) => {
    setSelectedAbility(ability);
  };

  // Sample tab data with placeholders
  const tabs = [
    {
      label: "Level Up",
      content: (
        <div className="text-center font-bold text-white">Coming Soon!!!</div>
      ),
    },
    {
      label: "TMs & HMs",
      content: (
        <div className="text-center font-bold text-white">
          Coming Very Very Soon!!!
        </div>
      ),
    },
    {
      label: "Tutor",
      content: (
        <div className="text-center font-bold text-white">
          Coming Soon for real!!!
        </div>
      ),
    },
    {
      label: "Egg Moves",
      content: (
        <div className="text-center font-bold text-white">
          Coming Soon I swear!!!
        </div>
      ),
    },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-2 p-1">
      <img
        src={displaySprite}
        alt={pokemon.name}
        className="h-18 w-18 object-contain"
      />
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold text-gray-200">{pokemon.name}</div>
        <div className="text-md text-gray-400">#{pokemon.ID}</div>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex flex-row justify-center gap-3 text-center italic">
          {renderAbilities(
            reorderedAbilities,
            getAbilityName,
            handleAbilityClick,
          )}
          {renderHiddenAbility(
            hiddenAbility,
            getAbilityName,
            handleAbilityClick,
          )}
        </div>
        <div className="w-full">
          {renderAbilityDescription(
            selectedAbility,
            getAbilityName,
            getAbilityDescription,
            () => setSelectedAbility(null),
          )}
        </div>
      </div>
      <div className = "w-full py-5">
        <TabbedInterface tabs={tabs} />
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="w-xl relative my-5 h-[95dvh] max-h-screen justify-normal rounded-lg border border-gray-100 bg-neutral-800 p-6">
        <CloseButton onClick={onClose} />
        <PokemonView pokemon={pokemon} isShiny={isShiny} />
      </div>
    </div>
  );
}
