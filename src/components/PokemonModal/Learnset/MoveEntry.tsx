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
    adjustedBg = bgColor.darken(1.5).mix("black", 0.05).alpha(0.25).css();
    adjustedBgCache[typeId] = adjustedBg;
  }

  return (
    <div
      className={`relative mt-2 flex select-none flex-col rounded-lg px-3 pb-4 ${level !== undefined ? "pt-6" : "pt-2"} transition-all duration-200 first:mt-0 hover:bg-white/[0.02]`}
      style={{ backgroundColor: adjustedBg }}
    >
      {level !== undefined && (
        <span className="absolute left-2 top-3 inline-flex h-5 min-w-max translate-y-[-30%] items-center justify-center rounded-full bg-black/30 px-2 text-xs font-medium text-gray-200 shadow-sm">
          {level !== 0 ? `Lvl ${level}` : "Evo"}
        </span>
      )}
      {/* Row 1: Move name/level and category/type */}
      <div className="mb-2 mt-0 flex w-full flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="text-lg font-bold tracking-wide"
            style={{ color: getTypeColor(move.type)[0] }}
          >
            {move.name}
          </span>
        </div>
        <div className="flex flex-row items-center gap-3 text-gray-200">
          <span className="flex size-8 items-center justify-center opacity-90">
            <img
              className="size-[28px] drop-shadow-sm"
              src={`icons/category/${move.cat}.png`}
            />
          </span>
          <TypeIcon typeId={move.type} size={28} />
        </div>
      </div>
      {/* Row 2: Power/Acc and MovePropBox */}
      <div className="mb-3 flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <span className="w-14 rounded-full bg-black/10 px-2 py-0.5 text-sm font-medium text-gray-100 shadow-sm ring-1 ring-white/20">
            {move.power ? `${move.power}` : "—"}
          </span>
          <span className="w-14 rounded-full bg-black/10 px-2 py-0.5 text-sm font-medium text-gray-100 shadow-sm ring-1 ring-white/20">
            {move.acc ? `${move.acc}%` : "—"}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <MovePropBox move={move} />
        </div>
      </div>
      {/* Row 3: Description */}
      <div className="mt-1 w-full text-sm leading-relaxed text-gray-300/90">
        {move.description}
      </div>
    </div>
  );
});

export default MoveEntry;
