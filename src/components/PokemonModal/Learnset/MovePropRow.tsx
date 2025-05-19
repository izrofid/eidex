// Row of move prop icons

import { Move } from "@/types";
import { capitalize } from "@/utils/miscUtils";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import React from "react";
import { BiPulse } from "react-icons/bi";
import {
  GiBullets,
  GiEnergySword,
  GiFangs,
  GiFootprint,
  GiPowder,
  GiPunch,
  GiWhirlwind,
} from "react-icons/gi";
import {
  MdHealthAndSafety,
  MdSportsGymnastics,
  MdTouchApp,
  MdVolumeUp,
} from "react-icons/md";
import { BsDashLg } from "react-icons/bs";

function MovePropBox({ move }: { move: Move }) {
  const moveAttr: string[] = move.properties ? move.properties : ["None"];

  const moveAttrIconMap: {
    [key: string]: React.ComponentType<{ size?: number | string }>;
  } = {
    contact: MdTouchApp,
    kicking: GiFootprint,
    ballistic: GiBullets,
    biting: GiFangs,
    healing: MdHealthAndSafety,
    sound: MdVolumeUp,
    punching: GiPunch,
    powder: GiPowder,
    slicing: GiEnergySword,
    pulse: BiPulse,
    wind: GiWhirlwind,
    dance: MdSportsGymnastics,
  };

  return (
    <TooltipProvider>
      <div className="flex text-white cursor-pointer rounded-full border-1 border-neutral-500 min-w-[3em] justify-center">
        {moveAttr.map((attr, i) => {
          const Icon = moveAttrIconMap[attr] || BsDashLg;
          return (
            <Tooltip key={attr + i}>
              <TooltipTrigger asChild>
                <span className="h-6 w-6 flex items-center justify-center object-contain p-1">
                  <Icon size={15} />
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-neutral-900/90 text-white px-2 py-1 border-1 border-gray-500 rounded shadow-lg text-xs">
                {attr && moveAttrIconMap[attr] ? capitalize(attr) : "—"}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

export default MovePropBox;
