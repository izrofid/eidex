import spritesData from "../data/sprites.json";
import shinySpritesData from "../data/shiny_sprites.json";

import { TypeBadge } from "./TypeBadge";
import { getAbilityName } from "../utils/abilityData";
import { Pokemon } from "../types";

type PokemonCardProps = Pokemon & {
  isShiny?: boolean;
  onClick?: () => void;
};

export function PokemonCard({
  ID,
  dexID,
  nameKey,
  type,
  isShiny,
  stats,
  abilities,
  onClick,
}: PokemonCardProps) {
  // Convert the ID to a string and pad it with leading zeros and a #
  const formattedId = `#${String(dexID).padStart(3, "0")}`;

  const statLabels = ["HP", "Atk", "Def", "Spe", "SpA", "SpD"];

  // Calculate the BST (Base Stat Total)
  const bst = stats.reduce((sum, stat) => sum + stat, 0);

  const reorderedAbilities = [...abilities.slice(1), abilities[0]];

  // If the sprite is "", then use the default sprite
  const fallbackSprite = "/missingno.png";

  const shinySprite = `data:image/png;base64,${shinySpritesData[ID.toString() as keyof typeof shinySpritesData]}`;
  const regularSprite = `data:image/png;base64,${spritesData[ID.toString() as keyof typeof spritesData]}`;

  const displaySprite = isShiny ? shinySprite : regularSprite;

  return (
    <div onClick={onClick} className="cursor-pointer w-full">
      <div className="flex w-full flex-col text-white">
        {/* Header */}
        <div className="flex justify-between bg-gray-900 px-2 py-1">
          <div className="flex items-center gap-2">
            {/* Sprite and name  */}
            <img
              src={displaySprite || fallbackSprite}
              className="h-14 w-14 object-contain p-1"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackSprite;
              }}
            />
            <div className="text-md min-w-25 font-bold">{nameKey}</div>

            {/* Types */}
            <div className="mt-1 flex flex-row items-center gap-1 justify-self-end px-2 max-sm:flex-col">
              {type.map((typeId: number, index: number) => (
                <div key={index}>
                  <TypeBadge typeId={typeId} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center px-3">{formattedId}</div>
        </div>

        {/* Card body */}
        <div className="bg-gray-800 px-5 py-3">
          <div className="relative flex flex-row gap-5 rounded-md border-3 border-fieldset-border p-4 py-2">
            <span className="h-4 md:h-5 pkmnem-face pkmnem-face-shadow 
              absolute -top-2.5 md:-top-3 left-2 bg-fieldset px-2 py-0 text-gray-200 rounded-sm text-sm md:text-base">
              <p className="ios-padding-fix -mt-[1.5px] md:-mt-[1.5px] p-0">
                ABILITIES
                </p>
            </span>
            {/* Abilities */}
            {reorderedAbilities.map(
              ([abilityId, abilityIndex], index: number) => {
                const name = getAbilityName([abilityId, abilityIndex]);
                const isHidden = index === reorderedAbilities.length - 1; // last one = Hidden

                return (
                  <div
                    key={index}
                    className={`text-left italic ${
                      isHidden ? "font-semibold text-pink-400" : ""
                    }`}
                  >
                    {name}
                  </div>
                );
              },
            )}
          </div>

          {/* Stats here */}
          <div className="my-2 flex flex-col">
            <div className="flex gap-4 text-center">
              {stats.map((statValue, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-sm italic">{statValue}</div>
                  <div className="text-md font-bold">
                    {statLabels[index]}
                  </div>
                </div>
              ))}
              {/* After all the stats, add one extra box for BST */}
              <div className="flex flex-col items-center">
                <div className="text-sm font-bold italic">{bst}</div>
                <div className="text-sm font-bold text-amber-400">BST</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
