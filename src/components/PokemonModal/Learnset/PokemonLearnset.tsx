import { Move, Pokemon } from "../../../types";
import { memo, useMemo, useState } from "react";
import { LearnsetList } from "./LearnsetList";
import { useUIStore } from "@/stores/uiStore";
import ViewChanger from "./LearnsetList/ViewChanger";
import { getMoveData } from "@/utils/moveData";
import { findRootSpecies } from "@/utils/evoFamily";
import { getSpeciesData } from "@/utils/speciesUtils";

type PokemonLearnsetProps = {
    pokemon: Pokemon;
};
type MoveWithLevel = Move & { level: number };

const moveOrigins = ["levelUpMoves", "tmMoves", "eggMoves"] as const;

type MoveOrigin = (typeof moveOrigins)[number];

// Passing function to classname is weird but it works
const LearnsetTab = ({
    label,
    isSelectedTab,
    onClick,
}: {
    label: string;
    isSelectedTab: boolean;
    onClick: () => void;
}) => (
    <div
        className={`relative flex-1 cursor-pointer px-3 py-2 text-sm font-medium transition-all duration-200 ${
            isSelectedTab
                ? "border-b-2 border-sky-400 bg-zinc-700 text-white shadow-sm"
                : "border-b-2 border-transparent bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-white"
        } focus:outline-none`}
        onClick={onClick}
    >
        {label}
    </div>
);
const PokemonLearnset = memo(({ pokemon }: PokemonLearnsetProps) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const learnsetView = useUIStore((state) => state.learnsetView);
    const moves: MoveWithLevel[] = useMemo(() => {
        const moveOrigin = moveOrigins[selectedTabIndex] as MoveOrigin;
        const stack: MoveWithLevel[] = [];
        if (moveOrigin === "levelUpMoves") {
            if (!pokemon.levelUpMoves) return [];
            const moves = pokemon.levelUpMoves;
            moves.forEach((arr) => {
                const [moveId, level] = arr;
                const move = getMoveData(moveId);
                if (!move) return null;
                stack.push({ ...move, level });
            });
        } else if (moveOrigin === "tmMoves") {
            if (!pokemon.tmMoves) return [];
            const moves = pokemon.tmMoves;
            moves.forEach((moveId) => {
                const move = getMoveData(moveId);
                if (!move) return null;
                stack.push({ ...move, level: 0 });
            });
        } else {
            // eggMoves
            const rootSpeciesId = findRootSpecies(pokemon.speciesId);
            const rootSpecies = getSpeciesData(rootSpeciesId);
            const moves = rootSpecies.eggMoves ?? [];
            if (!moves) return [];
            moves.forEach((moveId) => {
                const move = getMoveData(moveId);
                if (!move) return null;
                stack.push({ ...move, level: 0 });
            });
        }
        return stack.filter((move) => move !== null);
    }, [learnsetView, selectedTabIndex, pokemon]);

    return (
        <div className="w-full">
            <ViewChanger />
            <div className="relative flex overflow-clip rounded-md bg-zinc-800/30">
                <LearnsetTab
                    label="Level"
                    onClick={() => setSelectedTabIndex(0)}
                    isSelectedTab={selectedTabIndex === 0}
                />
                <LearnsetTab
                    label="TMs"
                    isSelectedTab={selectedTabIndex === 1}
                    onClick={() => setSelectedTabIndex(1)}
                />
                <LearnsetTab
                    label="Breed"
                    isSelectedTab={selectedTabIndex === 2}
                    onClick={() => setSelectedTabIndex(2)}
                />
            </div>
            <div className="mt-4">
                <LearnsetList moves={moves} />
            </div>
        </div>
    );
});

export default PokemonLearnset;
