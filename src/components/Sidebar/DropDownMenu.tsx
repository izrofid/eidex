import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import React from "react";

interface DropDownMenuProps {
  menuButton: React.ReactNode;
  menuItems?: { label: string; onClick: () => void }[];
}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({ menuButton, menuItems }) => {
    return (
        <Menu>
            <MenuButton className="data-active:bg-zinc-700 w-full rounded-md font-sans">
                {menuButton}
            </MenuButton>
            <MenuItems
                anchor="right start"
                className="z-40 min-w-[180px] rounded-lg border border-zinc-700 bg-zinc-800/95 p-2 font-sans text-white shadow-lg [--anchor-gap:28px] focus:outline-0"
            >
                {menuItems && menuItems.length > 0 ? (
                    menuItems.map((item, idx) => (
                        <MenuItem key={item.label + idx}>
                            <Button
                                className="flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-700/80 transition-colors font-medium text-left"
                                onClick={item.onClick}
                            >
                                {item.label}
                            </Button>
                        </MenuItem>
                    ))
                ) : (
                    // fallback: render nothing or a default
                    null
                )}
            </MenuItems>
        </Menu>
    );
};
