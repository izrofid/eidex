import { useUIStore } from "@/stores/uiStore";
import { Button } from "@headlessui/react";
import React from "react";
import { MdHelp } from "react-icons/md";

const HelpButton: React.FC = () => {
  const openHelp = useUIStore((state) => state.openHelp);

  return (
    <Button
      onClick={openHelp}
      className="select-none rounded-full cursor-pointer bg-teal-600 px-2 py-1 text-xs font-medium font-lexend text-gray-200 shadow-sm transition-colors duration-200 hover:bg-teal-700 focus:outline-none flex items-center justify-center gap-1"
      aria-label="Open help panel"
    >
      <MdHelp size={20}/>
    </Button>
  );
};

export default HelpButton;
