import { Dialog, DialogPanel, DialogTitle, Button} from "@headlessui/react";
import CloseButton from "../MiscUI/CloseButton";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import { useUIStore } from "@/stores/uiStore";
import { FaGamepad, FaCode, FaUsers, FaDatabase } from "react-icons/fa";

type ContributorProps = {
  name: string;
  role: string;
  icon: React.ReactNode;
  bgColor?: string;
  onClick?: () => void;
  textColor?: string;
};

const Contributor = ({ 
  name, 
  role, 
  icon,
  onClick,
  bgColor = "bg-indigo-600/30", 
  textColor = "text-indigo-400" 
}: ContributorProps) => (
  <Button 
    className={`flex w-full items-center text-left gap-3 rounded-lg bg-zinc-700/50 px-4 py-3 shadow-sm transition-all hover:bg-zinc-700/70 ${onClick ? 'cursor-pointer' : ''}`} 
    onClick={onClick}
  > 
    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${bgColor} ${textColor}`}>
      {icon}
    </div>
    <div>
      <h3 className="font-chakra text-sm font-bold text-gray-200">{name}</h3>
      <p className="text-xs text-gray-400">{role}</p>
    </div>
  </Button>
);

const CreditsContent = () => (
  <div className="space-y-4 select-none">
    <div>
      <p className="text-sm leading-relaxed text-gray-300">Thank you to all the people who worked on this project or otherwise made it possible</p>
    </div>
    
    {/* Contributors Section */}
    <div className="space-y-3">
      <h2 className="font-chakra text-lg font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">Contributors</h2>
      <div className="space-y-2">
        <Contributor 
          name="Specker" 
          onClick={() => window.open("https://youtu.be/Vhh_GeBPOhs?si=3miPrNZjx8GwqHgz", "_blank", "noopener,noreferrer")}
          role="Major contributor" 
          icon={<FaCode className="text-sm" />}
          bgColor="bg-sky-600/30"
          textColor="text-sky-400"
        />
        <Contributor 
          name="Alex" 
          role="Data extraction" 
          icon={<FaDatabase className="text-sm" />}
          bgColor="bg-amber-600/30"
          textColor="text-amber-400"
        />
        <Contributor 
          name="Hedara" 
          role="Data extraction" 
          icon={<FaDatabase className="text-sm" />}
          bgColor="bg-amber-600/30"
          textColor="text-amber-400"
        />
      </div>
    </div>
    
    {/* Special Thanks Section */}
    <div className="space-y-3">
      <h2 className="font-chakra text-lg font-bold bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">Special Thanks</h2>
      <div className="space-y-2">
        {/* Game Creator */}
        <Contributor 
          name="iriv24" 
          role="Emerald Imperium Dev" 
          icon={<FaGamepad className="text-sm" />}
          bgColor="bg-emerald-600/30"
          textColor="text-emerald-400" 
        />
        
        {/* RR Dex Creator */}
        <Contributor 
          name="jwow" 
          role="RR Dex Dev" 
          icon={<FaCode className="text-sm" />}
          bgColor="bg-sky-600/30"
          textColor="text-sky-400"
        />
        
        {/* Community */}
        <Contributor 
          name="EI Discord Community" 
          role="Feedback, testing, and ongoing support" 
          icon={<FaUsers className="text-sm" />}
          bgColor="bg-purple-600/30"
          textColor="text-purple-400"
        />
      </div>
    </div>
    
    <div className="font-chakra text-center text-xs mt-2">
      <p className="text-gray-400 opacity-50">KildieSoft &copy; {new Date().getFullYear()}</p>
    </div>
  </div>
);

const CreditsPanel = () => {
  const isCreditsOpen = useUIStore((state) => state.isCreditsOpen);
  useBodyScrollLock(isCreditsOpen);

  const closeCredits = useUIStore((state) => state.closeCredits);

  return (
    <Dialog 
      open={isCreditsOpen} 
      onClose={closeCredits}
      className="relative z-50"
    >
      {/* Background overlay with subtle blur */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
      
      {/* Dialog positioning */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md max-h-[85dvh] overflow-hidden rounded-2xl bg-zinc-800 shadow-xl ring-1 ring-white/10 transition-all">
          {/* Fixed header */}
          <div className="sticky top-0 z-10 flex items-center justify-between bg-zinc-800/95 backdrop-blur-sm p-6 pb-3 border-b border-zinc-700/40">
            <DialogTitle className="font-chakra text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text text-transparent">Credits</DialogTitle>
            <CloseButton onClick={closeCredits} />
          </div>
          
          {/* Scrollable content */}
          <div className="max-h-[calc(85dvh-76px)] overflow-y-auto px-6 pt-4 pb-6 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
              <CreditsContent />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreditsPanel;
