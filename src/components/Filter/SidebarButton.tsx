import { Button } from "@headlessui/react";
import React from "react";
import { LiaSlidersHSolid } from "react-icons/lia";
import { useSidebar } from "../ui/sidebar";

const SidebarButton: React.FC = () => {
  const {toggleSidebar} = useSidebar()

  return (
    <Button
      className="text-gray-200 hover:text-emerald-400 focus:outline-none active:text-emerald-600 sm:hidden"
      onClick={() => toggleSidebar()}
    >
      <LiaSlidersHSolid size={20} />
    </Button>
  );
};

export default SidebarButton;
