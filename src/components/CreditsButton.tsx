import { useUIStore } from "@/stores/uiStore";
import { Button } from "@headlessui/react";
import { FaRegCopyright } from "react-icons/fa";
import React from "react";

const CreditsButton: React.FC = () => {
  const openCredits = useUIStore((state) => state.openCredits);

  return (
    <Button
      onClick={openCredits}
      className="select-none rounded-full cursor-pointer bg-slate-600 px-2 py-1 text-xs font-medium font-lexend text-gray-200 shadow-sm transition-colors duration-200 hover:bg-slate-700 focus:outline-none flex items-center justify-center gap-1"
    >
      <FaRegCopyright size={20} />
    </Button>
  );
};

export default CreditsButton;
