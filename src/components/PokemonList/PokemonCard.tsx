import { getTypeColor } from "../../utils/typeInfo";
import { TypeBadge } from "../TypeBadges/TypeBadge";
import { getAbilityName, isAbilityAvialable } from "../../utils/abilityData";
import { Pokemon } from "../../types";
import chroma from "chroma-js";
import { useUIStore } from "@/stores/uiStore";

import { useScreenWidth } from "@/hooks/useScreenWidth";
import SpriteImage from "../MiscUI/SpriteImage";
import { randomizeAbility } from "@/randomiser/randomiser";
import { abilityWhitelist } from "@/randomiser/abilityWhitelist";
import { useRandomiserStore } from "@/stores/randomiserStore";

type PokemonCardProps = {
  pokemon: Pokemon;
};

const adjustedBgCache: Record<number, string> = {};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  // Get UI State from store
  const openModal = useUIStore((state) => state.openModal);
  const screenWidth = useScreenWidth();

  const {
    speciesId,
    dexId,
    nameKey,
    types,
    stats,
    abilities: origAbilities,
  } = pokemon;

  const isRandomiserActive = useRandomiserStore(
    (state) => state.isRandomiserActive,
  );

  const abilities = origAbilities.map((_, i) =>
    randomizeAbility(speciesId, i, abilityWhitelist, isRandomiserActive),
  );

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

  const getBstColorClass = (bst: number) => {
    if (bst < 450) return "text-red-400";
    if (bst < 500) return "text-amber-400";
    if (bst < 600) return "text-emerald-600";
    if (bst < 650) return "text-green-400";
    return "text-cyan-400";
  };

  const typeId = types[0];
  let adjustedBg = adjustedBgCache[typeId];
  if (!adjustedBg) {
    const snapColor = getTypeColor(typeId)[1];
    const bgColor = chroma(snapColor);
    adjustedBg = bgColor.darken(1.2).mix("black", 0.05).alpha(0.15).css();
    adjustedBgCache[typeId] = adjustedBg;
  }

  return (
    <div onClick={() => openModal(pokemon)} className="w-full cursor-pointer">
      <div className="border-b-1 flex w-full flex-col border-neutral-500/20 bg-neutral-800 text-white transition-colors duration-200 hover:bg-neutral-700/30">
        {/* Header */}
        <div className="flex justify-between bg-zinc-800/90 py-2 pl-2 shadow-sm">
          <div className="flex items-center gap-1">
            {/* Sprite and name  */}
            <SpriteImage pokemon={pokemon} />
            <div className="text-md font-bold tracking-wide font-chakra">{nameKey}</div>

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
        <div className="px-5 py-6 space-y-2" style={{ backgroundColor: adjustedBg }}>
          <div className="border-1 flex flex-wrap gap-x-5 rounded-md border-white/10 bg-black/15 p-4 pt-5 pb-3 shadow-inner">
            {/* Abilities */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 w-full ml-1">
            {abilities.map((abilityTuple: [number, boolean], index: number) => {
              const abilityId: number = abilityTuple[0];
              const name = getAbilityName(abilityId);
              const isAvailable = isAbilityAvialable(
                pokemon.speciesId,
                index,
                isRandomiserActive,
              );
              const isHidden = index === abilities.length - 1; // last one = Hidden

              return (
                name !== "None" && (
                  <div
                    key={index}
                    className={`px-2 py-0.5 italic ${
                      isHidden ? "font-semibold text-pink-400" : ""
                    } ${isAvailable ? "" : "line-through opacity-70"}`}
                  >
                    {name}
                  </div>
                )
              );
            })}
            </div>
          </div>

          {/* Stats here */}
          <div className="border-1 space-y-2 flex flex-col w-full rounded-md border-white/10 bg-black/15 py-3 shadow-inner">
            {/* Stats grid with BST on larger screens */}
            <div className="grid" style={{ 
              gridTemplateColumns: 'repeat(6, 1fr) auto', 
              gap: '1rem', 
              padding: '0 0.5rem' 
            }}>
              {reorderedStats.map((statValue, index) => {
                const statColor = 
                  statValue < 60 ? "text-red-400" :
                  statValue < 80 ? "text-orange-400" :
                  statValue < 100 ? "text-yellow-400" :
                  statValue < 120 ? "text-emerald-400" :
                  "text-cyan-400";
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`text-sm font-semibold ${statColor}`}>
                      {statValue}
                    </div>
                    <div className="mt-1 text-xs font-medium tracking-wide">
                      {statLabels[index]}
                    </div>
                  </div>
                );
              })}
              
              {/* BST in grid for larger screens */}
              <div className="hidden 2xs:flex items-center justify-center bg-zinc-600/50 rounded-md px-3 ml-2 shadow-sm">
                <div className="flex flex-col items-center">
                  <div className={`text-sm font-bold ${getBstColorClass(bst)}`}>{bst}</div>
                  <div className="mt-1 text-xs font-medium tracking-wide pb-1">
                    BST
                  </div>
                </div>
              </div>
            </div>
            
            {/* Separate BST box for small screens only */}
            <div className="flex items-center justify-center 2xs:hidden mt-2">
              <div className="bg-zinc-600/50 rounded-md px-4 py-1 flex items-center gap-2 shadow-sm">
                <div className={`text-md font-bold ${getBstColorClass(bst)}`}>{bst}</div>
                <div className="text-xs font-bold tracking-wide">
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
