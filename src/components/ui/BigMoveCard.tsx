import { Move } from "@/types";
import MovePropBox from "../PokemonModal/Learnset/LearnsetList/MovePropRow";
import { getTypeColor } from "@/utils/typeInfo";
import chroma from "chroma-js";

interface BigMoveCardProps {
    move: Move & { level?: number };
    renderIcon?: () => React.ReactNode;
    RenderButton?: () => React.ReactNode;
}

const BigMoveCard = ({
    move,
    renderIcon: RenderIcon,
    RenderButton,
}: BigMoveCardProps) => {
    const typeId = move.type;

    const snapColor = getTypeColor(typeId)[1];
    const bgColor = chroma(snapColor);
    const adjustedBg = bgColor.darken(1.5).mix("black", 0.05).alpha(0.25).css();
    const typeColor = getTypeColor(typeId)[0];
    return (
        <div
            className={`relative mt-2 flex select-none flex-col px-3 py-4 transition-all duration-200 first:mt-0 hover:bg-white/[0.02]`}
            style={{ backgroundColor: adjustedBg }}
        >
            {/* Row 1: Move name/level and category/type */}
            <div className="my-2 mt-0 flex w-full flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <span
                        className="text-lg font-bold tracking-wide"
                        style={{ color: typeColor }}
                    >
                        {move.name}
                    </span>
                    {move.level && (
                        <span className="text-sm text-gray-400">
                            {move.level}
                        </span>
                    )}
                </div>
                <div className="flex flex-row items-center gap-3 text-gray-200">
                    <span className="flex size-8 items-center justify-center opacity-90">
                        <img
                            className="size-[28px] drop-shadow-sm"
                            src={`icons/category/${move.cat}.png`}
                        />
                    </span>
                    {RenderIcon && RenderIcon()}
                </div>
            </div>
            {/* Row 2: Power/Acc and MovePropBox */}
            <div className="mb-3 flex w-full flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-1">
                    <span className="flex w-max justify-center rounded bg-black/30 px-2 py-0.5 text-xs text-red-400 shadow-sm ring-1 ring-red-400/20">
                        {move.power ? `${move.power}` : "—"}
                    </span>
                    <span className="flex w-max justify-center rounded bg-black/30 px-2 py-0.5 text-xs text-blue-400 shadow-sm ring-1 ring-blue-400/20">
                        {move.acc
                            ? move.acc === 999
                                ? "∞"
                                : `${move.acc}%`
                            : "—"}
                    </span>
                    <span className="flex w-max justify-center rounded bg-black/30 px-2 py-0.5 text-xs text-amber-400 shadow-sm ring-1 ring-amber-400/20">
                        {`${move.pp} PP`}
                    </span>
                </div>
                <div className="flex flex-row items-center">
                    <MovePropBox move={move} />
                </div>
            </div>
            {/* Row 3: Description */}
            <div className="mt-1 w-full text-sm leading-relaxed text-gray-300/90">
                <span className="flex justify-between gap-1">
                    <span>{move.description}</span>
                    {RenderButton && RenderButton()}
                </span>
            </div>
        </div>
    );
};

export default BigMoveCard;
