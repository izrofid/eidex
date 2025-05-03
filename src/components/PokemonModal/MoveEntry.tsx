import { useScreenWidth } from "../../hooks/useScreenWidth";
import { Move } from "../../types";
import { TypeBadge } from "../TypeBadges/TypeBadge";

type MoveEntryProps = {
    move: Move;
};

const MoveEntry: React.FC<MoveEntryProps> = ({ move }) => {

    const screenWidth = useScreenWidth();
    return (
        <div className="shadow-md/30 flex flex-col py-10 bg-zinc-700/30 p-4 select-none">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="text-lg font-bold text-white">{move.name}</div>
                    <TypeBadge typeId={move.type} screenWidth={screenWidth} />
                </div>
                <span className="text-sm text-gray-400">
                    Power: {move.power || "—"}
                </span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                    Accuracy: {move.accuracy || "—"}%
                </span>
                <span className="text-sm text-gray-400">PP: {move.pp}</span>
            </div>
            <p className="text-xs italic text-gray-300">{move.description}</p>
        </div>
    );
};

export default MoveEntry;
