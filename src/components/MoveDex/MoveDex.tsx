import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useUIStore } from "../../stores/uiStore";
import CreditsPanel from "../InfoSection/CreditsPanel";
import HelpPanel from "../InfoSection/HelpPanel";
import FloatingButton from "../MiscUI/FloatingActionButton";
import moves from "@/data/moveData.json";
import MoveDexList from "./MoveDexList";
import MoveDexHeaderBar from "./MoveDexHeaderBar";
import MoveDexCombobox from "./MoveDexCombobox";


const MoveDex:React.FC = () => {

    const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

    const containerRef = useRef<HTMLDivElement>(null);
    const [rightOffset, setRightOffset] = useState(16);

    useEffect(() => {
        function updateButtonPosition() {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const distanceFromRight = window.innerWidth - rect.right;
                setRightOffset(distanceFromRight > 16 ? distanceFromRight : 16);
            }
        }

        updateButtonPosition();

        window.addEventListener("resize", updateButtonPosition);
        return () => window.removeEventListener("resize", updateButtonPosition);
    }, []);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    return (
        <div className="sm:ml-(--sidebar-width) flex min-h-screen w-full flex-col items-center bg-neutral-900">
            <div ref={ref} className="w-full bg-zinc-800 sm:max-w-[60%]">
                <MoveDexHeaderBar />
            <div className="px-3">
 <MoveDexCombobox  />
            </div>
            </div>
            <div
                ref={containerRef}
                className="relative flex h-full w-full flex-col sm:max-w-[60%]"
            >
                <CreditsPanel />
                <HelpPanel />
                <MoveDexList moves={Object.values(moves)}/>

                {!inView && !isSidebarOpen && (
                    <div
                        className="fixed bottom-5 z-10 md:hidden"
                        style={{ right: `${rightOffset}px` }}
                    >
                        <FloatingButton />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MoveDex;
