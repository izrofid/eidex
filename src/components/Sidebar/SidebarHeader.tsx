import { LuChevronsUpDown } from "react-icons/lu";
import CloseButton from "../MiscUI/CloseButton";
import React from "react";
import { DropDownMenu } from "./DropDownMenu";
import { useUIStore } from "@/stores/uiStore";
interface SidebarHeaderProps {
    toggleSidebar: () => void;
}

const DEX_HEADER_CONFIG = {
    pokemon: {
        icon: "icons/pokeball.svg",
        text: ["Poké", "Dex"],
        colorClasses: ["text-red-100", "text-rose-500"],
    },
    move: {
        icon: "icons/blast.png",
        text: ["Move", "Dex"],
        colorClasses: ["text-amber-200", "text-amber-500"],
    },
};

const SideBarHeaderButton: React.FC = () => {
    const activeDex = useUIStore((state) => state.activeDex);
    const config = DEX_HEADER_CONFIG[activeDex];
    return (
        <span className="flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1 hover:bg-zinc-700/60">
            <span className="flex items-center gap-1">
                <img src={config.icon} className="size-9" />
                <span className="flex items-center gap-0.5">
                    <span
                        className={`pb-1 text-2xl font-extrabold tracking-tight drop-shadow-sm ${config.colorClasses[0]}`}
                    >
                        {config.text[0]}
                    </span>
                    <span
                        className={`pb-1 text-2xl font-extrabold tracking-tight drop-shadow-sm ${config.colorClasses[1]}`}
                    >
                        {config.text[1]}
                    </span>
                </span>
            </span>
            <LuChevronsUpDown className="size-6 text-white" />
        </span>
    );
};

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
    toggleSidebar,
}) => {
    const setActiveDex = useUIStore((state) => state.setActiveDex);
    return (
        <div className="mb-2 flex w-full items-center justify-between gap-2">
            <DropDownMenu
                menuButton={<SideBarHeaderButton />}
                menuItems={[
                    {
                        label: "Pokédex",
                        onClick: () => setActiveDex("pokemon"),
                    },
                    {
                        label: "MoveDex",
                        onClick: () => setActiveDex("move"),
                    },
                ]}
            />
            <span className="sm:hidden">
                <CloseButton onClick={toggleSidebar} />
            </span>
        </div>
    );
};
