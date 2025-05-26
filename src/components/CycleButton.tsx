import { Button } from "@headlessui/react";
import { IconType } from "react-icons";
import { MdError, MdCheckCircle, MdRemoveCircle } from "react-icons/md";
import React from "react";

type CycleState = boolean | undefined;

interface CycleButtonProps {
  label: string;
  icons?: [IconType?, IconType?, IconType?]; // Array of three optional icons for true, false, undefined states
  value: CycleState;
  onClick: () => void;
}

const CycleButton: React.FC<CycleButtonProps> = (props) => {
  // Helper to get background color based on state
  const getButtonColor = (): string => {
    if (props.value === true)
      return "bg-indigo-500 hover:bg-indigo-600"; // true (Only)
    else if (props.value === false)
      return "bg-rose-500 hover:bg-rose-600"; // false (Block)
    else return "bg-zinc-600 hover:bg-zinc-700"; // undefined (Off)
  };

  // Get the current icon based on state
  const getCurrentIcon = (): IconType => {
    // Default icons if none provided
    const defaultIcons: [IconType, IconType, IconType] = [
      MdError, // Strict
      MdCheckCircle, // Permissive
      MdRemoveCircle, // Off
    ];

    // Map state to index
    let index: number;
    if (props.value === true)
      index = 0; // true (Strict)
    else if (props.value === false)
      index = 1; // false (Permissive)
    else index = 2; // undefined (Off)

    // Return provided icon or default
    return props.icons?.[index] ?? defaultIcons[index];
  };

  return (
    <Button
      onClick={props.onClick}
      className={`group flex w-max cursor-pointer ${getButtonColor()} overflow-hidden rounded-full text-xs shadow-md transition-all duration-200 ease-in-out hover:shadow-lg active:shadow-inner`}
    >
      <div className="flex w-max items-center justify-center rounded-l-full px-2 py-1 text-center font-medium tracking-wide text-white/90 transition-colors duration-200 group-hover:text-white">
        {props.label}
      </div>
      <div className="flex w-6 items-center justify-center pr-1 rounded-r-full bg-black/10 transition-colors duration-200 group-hover:bg-black/15">
        {React.createElement(getCurrentIcon(), {
          size: 15,
          className:
            "text-white/90 group-hover:text-white transition-colors duration-200",
        })}
      </div>
    </Button>
  );
};

export default CycleButton;
