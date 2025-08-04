import { useEffect, useState } from "react";
import { Move } from "../../types";
import { MoveCard } from "./MoveCard";
import { useMoveDexStore } from "@/stores/moveDexStore";
import { filterMoves } from "@/utils/moveDexFilterUtils/filterMoves";

const EmptyMessage = () => (
    <div className="flex flex-col items-center justify-center px-4 py-16">
        <div className="mb-4 rounded-full bg-zinc-700/10 p-6">
            <svg
                className="h-12 w-12 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
        <span className="mb-1 text-lg font-medium text-zinc-200">
            No Moves Found
        </span>
        <p className="max-w-sm text-center text-zinc-400">
            Try adjusting your filters or search criteria to find more moves
        </p>
    </div>
);
export default function MoveList({ moves }: { moves: Move[] }) {
    const moveFilters = useMoveDexStore((state) => state.moveFilters);

    const movesToDisplay = filterMoves(moves, moveFilters);
    const [visibleCount, setVisibleCount] = useState(50);

    // Reset visible count when the list changes
    useEffect(() => {
        const initialCount = Math.max(
            50,
            Math.ceil((window.innerHeight / 100) * 1.5),
        );
        setVisibleCount(Math.min(initialCount, movesToDisplay.length));
        window.scrollTo({ top: 0, behavior: "auto" });
        const timeoutId = setTimeout(() => {
            if (
                document.body.offsetHeight < window.innerHeight &&
                initialCount < movesToDisplay.length
            ) {
                setVisibleCount((prev) =>
                    Math.min(prev + 10, movesToDisplay.length),
                );
            }
        }, 100);
        return () => clearTimeout(timeoutId);
    }, [moves.length, moveFilters]);

    // Infinite Scroll
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 300
            ) {
                setVisibleCount((prev) =>
                    Math.min(prev + 50, movesToDisplay.length),
                );
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [moves.length, moveFilters]);
    // Dont do IIFEs after `return` -- or at least avoid it – not a performance issue
    // but its a sign you're doing something weird.
    // An IIFE is the (() =>{})() u had in the render function, which is a
    // neat JS trick, but again, a sign you're doing something the next person
    // reading your code will want to violently kill you for writing spaghetti.
    const visibleMoves = movesToDisplay.slice(0, visibleCount);
    if (visibleMoves.length === 0) {
        return <EmptyMessage />;
    }
    return (
        <div className="flex w-full flex-1 select-none flex-col items-center">
            <div className="border-b-1 sticky top-0 z-10 w-full border-neutral-700 bg-zinc-800 p-3"></div>
            <div className="w-full divide-y divide-zinc-700/80">
                {visibleMoves.map((move) => (
                    <div key={move.moveId} className="flex flex-col">
                        <MoveCard move={move} />
                    </div>
                ))}
            </div>
        </div>
    );
}
