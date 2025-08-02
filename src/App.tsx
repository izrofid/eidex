import Sidebar from "@/components/Sidebar/MainSidebar";
import PokedexSidebarContent from "@/components/Sidebar/PokedexSidebarContent";
import MoveDexSidebarContent from "@/components/Sidebar/MoveDexSidebarContent";
import "./App.css";
import { useUIStore } from "./stores/uiStore";
import PokeDex from "./components/PokeDex";
import MoveDex from "./components/MoveDex/MoveDex";
import React from "react";

function App() {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const activeDex = useUIStore((state) => state.activeDex);



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
          {activeDex === "pokemon" ? <PokedexSidebarContent /> : <MoveDexSidebarContent />}
        </Sidebar>
      </div>
      {activeDex === "pokemon" ? <PokeDex /> : <MoveDex />}
    </div>
  );
}

export default App;
