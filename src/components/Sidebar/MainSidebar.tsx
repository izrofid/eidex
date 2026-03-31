import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { useUIStore } from "@/stores/uiStore";
import { ReactNode } from "react";
import { SidebarHeader } from "./SidebarHeader";

interface SidebarProps {
  children: ReactNode;
}

function Sidebar({ children }: SidebarProps) {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const screenWidth = useScreenWidth();

  const isSmallScreen = screenWidth !== "md";

  const isScrollLock = isSmallScreen && isSidebarOpen;

  useBodyScrollLock(isScrollLock);

  return (
    <aside className="shadow-xl/50 relative flex h-[100dvh] w-full flex-col justify-between bg-zinc-800 px-5 py-6">
      <SidebarHeader toggleSidebar={toggleSidebar}/>
      {children}
    </aside>
  );
}

export default Sidebar;


