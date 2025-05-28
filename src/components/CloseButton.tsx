import { Button } from "@headlessui/react";
import { MdClose } from "react-icons/md";
import { FC } from "react";

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  size?: number;
}

const CloseButton: FC<CloseButtonProps> = ({
  onClick,
  className = "",
  size = 24,
}) => {
  return (
    <Button
      className={` ${className} text-gray-400 cursor-pointer hover:text-red-500 active:text-red-700 transition-all duration-200 focus:outline-none rounded-full p-1 hover:bg-zinc-700/30 leading-none`}
      onClick={onClick}
      aria-label="Close"
      type="button"
    >
      <MdClose size={size} />
    </Button>
  );
};

export default CloseButton;