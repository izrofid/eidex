import { useUIStore } from "@/stores/uiStore";
import { Button } from "@headlessui/react";
import React from "react";
import { FaSliders, FaX } from "react-icons/fa6";

const SidebarButton = React.memo(function SidebarButton({
  icon,
}: {
  /**
   * Name of React-Icons icon. "X" for the Sidebar button, "sliders" for the main GUI one.
   */
  icon: "sliders" | "X";
}) {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <Button
      className={`text-gray-200 hover:text-emerald-400 focus:outline-none active:text-emerald-600 sm:hidden`}
      onClick={() => toggleSidebar()}
    >
      {icon === "sliders" ? <FaSliders size={20} /> : <FaX size={20} />}
    </Button>
  );
});

export default SidebarButton;
