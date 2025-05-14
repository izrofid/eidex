import { getTypeSnapColor } from "../../utils/typeInfo";
import { TypeBadge } from "../TypeBadges/TypeBadge";
import { getAbilityName } from "../../utils/abilityData";
import { Pokemon } from "../../types";
import chroma from "chroma-js";
import getSprite from "@/utils/getSprite";
import { useUIStore } from "@/stores/uiStore";
import { useScreenWidth } from "@/hooks/useScreenWidth";

type PokemonCardProps = {
  pokemon: Pokemon;
};

const adjustedBgCache: Record<number, string> = {};

export function PokemonCard({pokemon}: PokemonCardProps) {
  // Get UI State from store
  const { isShiny, openModal } = useUIStore();
  const screenWidth = useScreenWidth();

  const { index, dexId, nameKey, types, stats, abilities } = pokemon;

  // Convert the ID to a string and pad it with leading zeros and a #
  const formattedId = `#${String(dexId).padStart(3, "0")}`;

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

  // If the sprite is "", then use the default sprite
  const fallbackSprite = `missingno.png`;

  const displaySprite = getSprite(index, isShiny);

  const typeId = types[0];
  let adjustedBg = adjustedBgCache[typeId];
  if (!adjustedBg) {
    const snapColor = getTypeSnapColor(typeId);
    const bgColor = chroma(snapColor);
    adjustedBg = bgColor.darken(1.2).mix("black", 0.7).alpha(0.13).css();
    adjustedBgCache[typeId] = adjustedBg;
  }

  //If the first ability is repeated, replace repeats with 0
  abilities.forEach((ability, index) => {
    if (abilities.indexOf(ability) !== index) {
      abilities[index] = 0;
    }
  });

  return (
    <div onClick={() => openModal(pokemon)} className="w-full cursor-pointer">
      <div className="flex w-full flex-col text-white">
        {/* Header */}
        <div className="flex justify-between bg-neutral-900/20 py-1 pl-2">
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
            <div className="mt-1 flex flex-col items-center gap-0 justify-self-end px-2 md:flex-row md:gap-1">
              {types.map((typeId: number, index: number) => (
                <div key={index}>
                  <TypeBadge typeId={typeId} screenWidth={screenWidth} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center px-3">{formattedId}</div>
        </div>

        {/* Card body */}
        <div className="px-5 py-6" style={{ backgroundColor: adjustedBg }}>
          <div className="border-3 relative mb-5 mt-3 flex flex-row gap-5 rounded-md border-neutral-600 p-4 py-2">
            <span className="font-pixel absolute -top-2.5 left-2 h-4 rounded-sm border border-gray-300 bg-blue-900 px-2 py-0 text-xs font-bold uppercase text-gray-200 md:-top-3 md:h-5">
              <p className="ios-padding-fix -mt-[1px] p-0 md:mt-[1px]">
                ABILITIES
              </p>
            </span>
            {/* Abilities */}
            {/* Abilities */}
            {abilities.map((abilityId: number, index: number) => {
              const name = getAbilityName(abilityId);
              const isHidden = index === abilities.length - 1; // last one = Hidden

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
            })}
          </div>

          {/* Stats here */}
          <div className="my-3 flex flex-col">
            <div className="flex items-end gap-1 text-center sm:gap-4">
              {reorderedStats.map((statValue, index) => (
                <div key={index} className="flex min-w-1 flex-col items-center">
                  <div className="text-sm italic">{statValue}</div>
                  <div className="md:text-md text-sm font-bold">
                    {statLabels[index]}
                  </div>
                </div>
              ))}
              {/* BST box, styled identically to stat boxes */}
              <div className="flex flex-col items-center border-l border-amber-400/50 pl-3">
                <div className="text-sm font-bold italic">{bst}</div>

                <div className="md:text-md text-sm font-bold text-amber-400">
                  BST
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
