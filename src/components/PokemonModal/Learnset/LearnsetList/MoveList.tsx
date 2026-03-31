import { ReactNode } from "react";

interface MoveListProps {
  children: ReactNode;
  emptyMessage?: string;
}

export const MoveList = ({ children, emptyMessage = "No Moves Available" }: MoveListProps) => {
  // If children is an empty array, show empty message
  if (Array.isArray(children) && children.every(child => child === null)) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-400">
        <span className="text-sm font-medium">{emptyMessage}</span>
      </div>
    );
  }

  return (
    <div>
      {children}
    </div>
  );
};
