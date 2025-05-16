import { useScreenWidth } from "../../../hooks/useScreenWidth";
import { Move } from "../../../types";
import { TypeBadge } from "../../TypeBadges/TypeBadge";
import { getTypeColor } from "@/utils/typeInfo";
import MovePropBox from "./MovePropRow";
import chroma from "chroma-js";

type MoveEntryProps = {
  move: Move;
  level?: number;
};

const adjustedBgCache: Record<number, string> = {};

const MoveEntry: React.FC<MoveEntryProps> = ({ move, level }) => {
  const screenWidth = useScreenWidth();

  const typeId =move.type
  let adjustedBg = adjustedBgCache[typeId];
  if (!adjustedBg) {
    const snapColor = getTypeColor(typeId)[1];
    const bgColor = chroma(snapColor);
    adjustedBg = bgColor.darken(1.2).mix("white", 0.05).alpha(0.12).css();
    adjustedBgCache[typeId] = adjustedBg;
  }

  return (
    <div className="border-b-1 relative flex select-none flex-col gap-2 border-gray-500 px-2 py-5"
      style={{backgroundColor: adjustedBg}}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span>
            <span
              className="text-base font-bold"
              style={{ color: getTypeColor(move.type)[0] }}
            >
              {move.name}
            </span>
            <span className="text-sm" style={{color: getTypeColor(move.type)[0]}}>
              {level ? ` @ ${level}` : ""}
            </span>
          </span>
          <span className="mr-3 h-6 w-6 object-contain">
            <img src={`icons/category/${move.cat}.png`}></img>
          </span>
          <TypeBadge typeId={move.type} screenWidth={screenWidth} />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-row gap-5">
            <span className="text-xs text-gray-100">
              Power: {move.power || "—"}
            </span>
            <span className="text-xs text-gray-100">
              Acc: {move.acc || "—"}%
            </span>
            <span className="absolute bottom-2 right-3">
              <MovePropBox move={move} />
            </span>
          </div>
        </div>
      </div>
      <span className="mt-1 text-left text-xs font-normal italic text-gray-300">
        {move.description}
      </span>
    </div>
  );
};

export default MoveEntry;
