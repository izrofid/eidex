import { Move } from "../../../types";
import { getTypeColor } from "@/utils/typeInfo";
import MovePropBox from "./MovePropRow";
import chroma from "chroma-js";
import { TypeIcon } from "@/components/TypeBadges/TypeIcon";
import { memo } from "react";

type MoveEntryProps = {
  move: Move;
  level?: number;
};

const adjustedBgCache: Record<number, string> = {};

const MoveEntry: React.FC<MoveEntryProps> = memo(({ move, level }) => {

  const typeId = move.type;
  let adjustedBg = adjustedBgCache[typeId];
  if (!adjustedBg) {
    const snapColor = getTypeColor(typeId)[1];
    const bgColor = chroma(snapColor);
    adjustedBg = bgColor.darken(1.2).mix("white", 0.05).alpha(0.12).css();
    adjustedBgCache[typeId] = adjustedBg;
  }

  return (
    <div
      className="border-b-1 relative flex select-none flex-col border-gray-600 px-2 py-6 shadow-sm transition-shadow hover:backdrop-brightness-120 sm:px-4"
      style={{ backgroundColor: adjustedBg }}
    >
        {level !== undefined && (
            <span
              className="absolute top-0 left-0 inline-flex h-6 w-12 justify-center font-regular items-center bg-gray-950/20 px-1 py-[1px] text-xs font-semibold"
            >
              {level !== 0 ? `Lvl ${level}` : "Evo"}
            </span>
          )}
      {/* Row 1: Move name/level and category/type */}
      <div className="flex flex-row justify-between items-center w-full mb-1">
        <div className="flex items-center gap-2">
          <span
            className="text-lg font-bold"
            style={{ color: getTypeColor(move.type)[0] }}
          >
            {move.name}
          </span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="flex size-8 items-center justify-center">
            <img className="size-[28px]" src={`icons/category/${move.cat}.png`} />
          </span>
          <TypeIcon typeId={move.type} size={28} />
        </div>
      </div>
      {/* Row 2: Power/Acc and MovePropBox */}
      <div className="flex flex-row justify-between items-center w-full mb-1">
        <div className="flex flex-row items-center gap-2">
          <span className="w-14 rounded-full border border-gray-500 bg-white/10 px-1 text-sm font-semibold text-gray-100 shadow-sm">
            {move.power ? `${move.power}` : "—"}
          </span>
          <span className="w-14 rounded-full border border-gray-500 bg-white/10 px-1 text-sm font-semibold text-gray-100 shadow-sm">
            {move.acc ? `${move.acc}%` : "—"}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <MovePropBox move={move} />
        </div>
      </div>
      {/* Row 3: Description */}
      <div className="mt-2 text-center text-xs italic text-gray-300 w-full">
        {move.description}
      </div>
    </div>
  );
});

export default MoveEntry;
