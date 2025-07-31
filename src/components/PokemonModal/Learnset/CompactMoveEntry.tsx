import { Move } from "../../../types";
import { getTypeColor } from "@/utils/typeInfo";
import { TypeIcon } from "@/components/TypeBadges/TypeIcon";
import chroma from "chroma-js";

type CompactMoveEntryProps = {
    move: Move;
    level?: number;
};

const adjustedBgCache: Record<number, string> = {};

const CompactMoveEntry: React.FC<CompactMoveEntryProps> = ({ move, level }) => {
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
            className="flex items-center gap-3 border-b bg-neutral-900 even:bg-zinc-800 border-neutral-700 px-3 py-1.5 text-xs text-gray-400 last:border-0"
        >
            <span className="flex flex-1 items-center gap-2 truncate pr-2 font-medium text-gray-300">
                {move.name}
                {typeof level !== "undefined" && (
                    <span className="ml-1 inline-flex h-5 min-w-max items-center border border-red-400/20 bg-neutral-800/70 text-red-200 justify-center rounded px-2 text-xsshadow-sm">
                        {level !== 0 ? `Lvl ${level}` : "Evo"}
                    </span>
                )}
            </span>
            <span className="flex items-center gap-1">
                <span className="min-w-[2.2em] rounded border border-blue-400/20 bg-neutral-800/70 px-2 py-0.5 text-center text-blue-200">
                    {move.power ? `${move.power}` : "—"}
                </span>
                <span className="min-w-[2.2em] rounded border border-yellow-400/20 bg-neutral-800/70 px-2 py-0.5 text-center text-yellow-200">
                    {move.acc ? (move.acc === 999 ? "∞" : `${move.acc}%`) : "—"}
                </span>
            </span>
            <span className="flex items-center gap-2 pl-2">
                <span className="flex items-center justify-center">
                    <img
                        className="size-4 rounded drop-shadow-sm"
                        src={`icons/category/${move.cat}.png`}
                    />
                </span>
                <TypeIcon typeId={move.type} size={18} />
            </span>
        </div>
    );
};

export default CompactMoveEntry;
