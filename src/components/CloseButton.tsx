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
      className={`text-gray-400 cursor-pointer hover:text-red-800 active:text-fuchsia-800 transition-colors focus:outline-none ${className}`}
      onClick={onClick}
      aria-label="Close"
      type="button"
      style={{ lineHeight: 0 }}
    >
    <MdClose size={size}/>
    </Button>
  );
};

export default CloseButton;