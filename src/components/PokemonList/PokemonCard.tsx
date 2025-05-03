import spritesData from "../../data/sprites.json";
import shinySpritesData from "../../data/shinySprites.json";

import { TypeBadge } from "../TypeBadges/TypeBadge";
import { getAbilityName } from "../../utils/abilityData";
import { Pokemon } from "../../types";

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

  const statLabels = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"];

  // Reorder stats to speed is moved from third to last
  const reorderedStats = [
    stats[0],
    stats[1],
    stats[2],
    stats[4],
    stats[5],
    stats[3],
  ];

  // Calculate the BST (Base Stat Total)
  const bst = stats.reduce((sum, stat) => sum + stat, 0);

  const reorderedAbilities = [...abilities.slice(1), abilities[0]];

  // If the sprite is "", then use the default sprite
  const fallbackSprite = "/missingno.png";

  const shinySprite = `data:image/png;base64,${shinySpritesData[ID.toString() as keyof typeof shinySpritesData]}`;
  const regularSprite = `data:image/png;base64,${spritesData[ID.toString() as keyof typeof spritesData]}`;

  const displaySprite = isShiny ? shinySprite : regularSprite;

  return (
    <div onClick={onClick} className="w-full cursor-pointer">
      <div className="flex w-full flex-col text-white">
        {/* Header */}
        <div className="flex justify-between bg-gray-900 py-1 pl-2">
          <div className="flex items-center gap-1">
            {/* Sprite and name  */}
            <img
              src={displaySprite || fallbackSprite}
              className="h-[64px] w-[64px] object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackSprite;
              }}
            />
            <div className="text-md font-bold">{nameKey}</div>

            {/* Types */}
            <div className="mt-1 flex flex-row items-center gap-1 justify-self-end px-2">
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
        <div className="bg-gray-800 px-5 py-3 pt-4">
          <div className="border-3 border-fieldset-border relative mt-1.5 flex flex-row gap-5 rounded-md p-4 py-2">
            <span className="font-pkmnem-short pkmnem-face-shadow bg-fieldset absolute -top-2.5 left-2 h-4 rounded-sm px-2 py-0 text-xs text-gray-200 md:-top-3 md:h-5">
              <p className="ios-padding-fix -mt-[1px] p-0 md:mt-[1px]">
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
            <div className="flex items-end gap-4 text-center">
              {reorderedStats.map((statValue, index) => (
                <div
                  key={index}
                  className="flex min-w-[40px] flex-col items-center"
                >
                  <div className="text-sm italic">{statValue}</div>
                  <div className="text-md font-bold">{statLabels[index]}</div>
                </div>
              ))}
              {/* BST box, styled identically to stat boxes */}
              <div className="flex flex-col items-center">
                <div className="text-sm font-bold italic">{bst}</div>
                <div className="text-md font-bold text-amber-400">BST</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
