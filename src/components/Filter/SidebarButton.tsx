import { useUIStore } from "@/stores/uiStore";
import { Button } from "@headlessui/react";
import React from "react";
import { FaSliders } from "react-icons/fa6";

const SidebarButton: React.FC = () => {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <Button
      className="text-gray-200 hover:text-emerald-400 focus:outline-none active:text-emerald-600 sm:hidden"
      onClick={() => toggleSidebar()}
    >
      <FaSliders size={20} />
    </Button>
  );
};

export default SidebarButton;
