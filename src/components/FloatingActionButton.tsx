import { useUIStore } from "@/stores/uiStore";
import { Button } from "@headlessui/react";
import React from "react";
import { FaSliders } from "react-icons/fa6";

const FloatingButton: React.FC = () => {

    const toggleSidebar = useUIStore(state => state.toggleSidebar)

    return (
    <Button
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-emerald-500 object-contain"
      onClick={toggleSidebar}
    >
      <FaSliders size={20} />
    </Button>
  );
};

export default FloatingButton;
