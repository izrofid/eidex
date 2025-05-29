import { Button } from "@headlessui/react";
import React from "react";
import { FaSliders } from "react-icons/fa6";
import { useSidebar } from "@/components/ui/sidebar"

const FloatingButton: React.FC = () => {

    const {toggleSidebar} = useSidebar()

    return (
    <Button
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-500 object-contain"
      onClick={toggleSidebar}
    >
      <FaSliders size={20} />
    </Button>
  );
};

export default FloatingButton;
