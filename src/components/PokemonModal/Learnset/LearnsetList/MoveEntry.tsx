import { Move } from "@/types";

import { TypeIcon } from "@/components/TypeBadges/TypeIcon";
import { memo } from "react";
import BigMoveCard from "@/components/ui/BigMoveCard";

type MoveEntryProps = {
    move: Move & { level?: number };
};

const MoveEntry: React.FC<MoveEntryProps> = memo(({ move }) => {
    return (
        <BigMoveCard
            move={move}
            renderIcon={() => <TypeIcon typeId={move.type} size={28} />}
        />
    );
});

export default MoveEntry;
