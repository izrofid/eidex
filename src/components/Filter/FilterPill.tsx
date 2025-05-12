import { ReactNode } from "react";
import { MdClose } from "react-icons/md";

interface FilterPillProps {
  bg?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function FilterPill({ bg = "bg-gray-700", children, onClick }: FilterPillProps) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full ${bg} pl-3 pr-2 py-1 text-xs font-semibold text-white`}>
      {children}
      {onClick && <MdClose className="self-center cursor-pointer" onClick={onClick} />}
    </span>
  );
}
