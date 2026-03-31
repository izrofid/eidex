import { Move } from "@/types";
import { useUIStore } from "@/stores/uiStore";
import MoveEntry from "./MoveEntry";
import CompactMoveEntry from "./CompactMoveEntry";
import { MoveList } from "./MoveList";
type MoveWithLevel = Move & { level: number };

const LearnsetList = ({ moves }: { moves: MoveWithLevel[] }) => {
    const learnsetView = useUIStore((state) => state.learnsetView);

    const list = moves.map((move, index) => {
        if (learnsetView === "card") {
            return <MoveEntry key={`level-${index}`} move={move} />;
        } else {
            return <CompactMoveEntry key={`egg-${index}`} move={move} />;
        }
    });

    return <MoveList emptyMessage="No Moves Available">{list}</MoveList>;
};

export default LearnsetList;
