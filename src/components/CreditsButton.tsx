import { useUIStore } from "@/stores/uiStore";
import { Button } from "@headlessui/react";
import React from "react";

const CreditsButton: React.FC = () => {
  const openCredits = useUIStore((state) => state.openCredits);

  return (
    <Button
      onClick={openCredits}
      className="font-pixel shadow-md/40 select-none items-center rounded bg-neutral-700 px-2 text-white hover:bg-gray-700"
    >
      Credits
    </Button>
  );
};

export default CreditsButton;
