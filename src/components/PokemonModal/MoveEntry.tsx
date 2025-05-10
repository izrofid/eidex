import { useScreenWidth } from "../../hooks/useScreenWidth";
import { Move } from "../../types";
import { TypeBadge } from "../TypeBadges/TypeBadge";
import { getTypeSnapColor } from "@/utils/typeInfo";

type MoveEntryProps = {
  move: Move;
};

const MoveEntry: React.FC<MoveEntryProps> = ({ move }) => {
  const screenWidth = useScreenWidth();
  return (
    <div className="border-b-1 flex select-none flex-col gap-2 border-gray-500 bg-zinc-700/20 px-2 py-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-1">
          <span
            className="text-base font-bold text-white"
            style={{ color: getTypeSnapColor(move.type) }}
          >
            {move.name}
          </span>
          <TypeBadge typeId={move.type} screenWidth={screenWidth} />
        </div>
        <div className="flex flex-row gap-5">
          <span className="text-xs text-gray-400">
            Power: {move.power || "—"}
          </span>
          <span className="text-xs text-gray-400">Acc: {move.acc || "—"}%</span>
        </div>
      </div>
      <span className="mt-1 text-left font-normal italic text-xs text-gray-300">
        {move.description}
      </span>
    </div>
  );
};

export default MoveEntry;
