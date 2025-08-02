import { useEffect, useState } from "react";
import { Move } from "../../types";
import { MoveCard } from "./MoveCard";


export default function MoveList({ moves }: { moves: Move[] }) {
  const [visibleCount, setVisibleCount] = useState(50);

  // Reset visible count when the list changes
  useEffect(() => {
    const initialCount = Math.max(
      50,
      Math.ceil((window.innerHeight / 100) * 1.5)
    );
    setVisibleCount(Math.min(initialCount, moves.length));
    window.scrollTo({ top: 0, behavior: "auto" });
    const timeoutId = setTimeout(() => {
      if (document.body.offsetHeight < window.innerHeight && initialCount < moves.length) {
        setVisibleCount(prev => Math.min(prev + 10, moves.length));
      }
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [moves.length]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setVisibleCount((prev) => Math.min(prev + 50, moves.length));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [moves.length]);

  return (
    <div className="flex flex-1 w-full flex-col items-center select-none">
      <div className="w-full sticky top-0 z-10 bg-zinc-800 border-b-1 border-neutral-700 p-3">
        {/* Header or controls can go here */}
      </div>
      <div className="w-full divide-y divide-zinc-700/80">
        {(() => {
          const visibleMoves = moves.slice(0, visibleCount);
          return visibleMoves.length > 0 ? (
            visibleMoves.map((move) => (
              <div key={move.moveId} className="flex flex-col">
                <MoveCard moveId={move.moveId} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="rounded-full bg-zinc-700/10 p-6 mb-4">
                <svg
                  className="w-12 h-12 text-zinc-500"
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
              <span className="text-lg font-medium text-zinc-200 mb-1">
                No Moves Found
              </span>
              <p className="text-zinc-400 text-center max-w-sm">
                Try adjusting your filters or search criteria to find more moves
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
