import { useScreenWidth } from "../../../hooks/useScreenWidth";
import { Move } from "../../../types";
import { TypeBadge } from "../../TypeBadges/TypeBadge";
import { getTypeSnapColor } from "@/utils/typeInfo";
import MovePropBox from "./MovePropRow";

type MoveEntryProps = {
  move: Move;
  level?: number;
};

const MoveEntry: React.FC<MoveEntryProps> = ({ move, level }) => {
  const screenWidth = useScreenWidth();
  return (
    <div className="relative border-b-1 flex select-none flex-col gap-2 border-gray-500 bg-zinc-700/20 px-2 py-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span>
            <span
              className="text-base font-bold text-white"
              style={{ color: getTypeSnapColor(move.type) }}
            >
              {move.name}
            </span>
            <span className="font-semibold italic text-neutral-100/80">
              {level ? ` @ ${level}` : ""}
            </span>
          </span>

          <TypeBadge typeId={move.type} screenWidth={screenWidth} />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-row gap-5">
            <span className="text-xs text-gray-400">
              Power: {move.power || "—"}
            </span>
            <span className="text-xs text-gray-400">
              Acc: {move.acc || "—"}%
            </span>
            <span className="absolute bottom-2 right-3"><MovePropBox move={move}/></span>
          </div>
          <span className="h-6 w-6 object-contain mr-3">
            <img src={`icons/category/${move.cat}.png`}></img>
          </span>
        </div>
      </div>
      <span className="mt-1 text-left text-xs font-normal italic text-gray-300">
        {move.description}
      </span>
    </div>
  );
};

export default MoveEntry;
