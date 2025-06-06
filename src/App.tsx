import Sidebar from "@/components/Sidebar/MainSidebar";
import PokedexSidebarContent from "@/components/Sidebar/PokedexSidebarContent";
import "./App.css";
import { useUIStore } from "./stores/uiStore";
import PokeDex from "./components/PokeDex";

function App() {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <div className="flex h-full w-[100%]">
      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-transparent sm:hidden"
          onClick={() => toggleSidebar()}
        />
      )}
      <div
        className={`sm:w-(--sidebar-width) fixed z-20 w-[95%] ${isSidebarOpen ? "" : "max-sm:hidden"}`}
      >
        <Sidebar>
          <PokedexSidebarContent />
        </Sidebar>
      </div>
      <PokeDex />
    </div>
  );
}

export default App;
