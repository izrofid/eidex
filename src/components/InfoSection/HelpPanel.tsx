import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import CloseButton from "../MiscUI/CloseButton";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import { useUIStore } from "@/stores/uiStore";

const HelpContent = () => (
  <div className="select-none space-y-6">
    <section>
      <h2 className="font-chakra mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
        Features & Filters
      </h2>
      <div className="space-y-4">
        {/* Type & Basic Filters */}
        <div className="rounded-lg border-l-4 border-cyan-500 bg-zinc-700/30 p-3">
          <h3 className="mb-2 border-b border-zinc-700/50 pb-1 text-sm font-medium text-cyan-300">
            Basic Filters
          </h3>
          <ul className="ml-4 space-y-1 text-xs text-gray-300">
            <li className="flex items-start">
              <span className="mr-1.5 text-cyan-400">•</span>
              <span>
                <span className="font-medium text-gray-200">Type:</span> Select
                one or two types
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-1.5 text-cyan-400">•</span>
              <span>
                <span className="font-medium text-gray-200">Direction:</span>{" "}
                Click the icon or the stat label to reverse
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-1.5 text-cyan-400">•</span>
              <span>
                <span className="font-medium text-gray-200">Sort by:</span> Dex
                ID, Name, or any stat
              </span>
            </li>
          </ul>
        </div>

        {/* Cycle Filters */}
        <div className="rounded-lg border-l-4 border-purple-500 bg-zinc-700/30 p-3">
          <h3 className="mb-2 border-b border-zinc-700/50 pb-1 text-sm font-medium text-purple-300">
            Cycle Filters
          </h3>
          <ul className="ml-4 space-y-1 text-xs text-gray-300">
            <li className="flex items-start">
              <span className="mr-1.5 text-purple-400">•</span>
              <span>
                <span className="font-medium text-gray-200">
                  Megas, Evolved
                </span>
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-1.5 text-purple-400">•</span>
              <span>
                <span className="font-medium text-gray-200">Three states:</span>{" "}
                Cycle through Include → Only → Exclude
              </span>
            </li>
          </ul>
        </div>

        {/* Stat Clamp */}
        <div className="rounded-lg border-l-4 border-emerald-500 bg-zinc-700/30 p-3">
          <h3 className="mb-2 border-b border-zinc-700/50 pb-1 text-sm font-medium text-emerald-300">
            Stat Clamp
          </h3>
          <ul className="ml-4 space-y-1 text-xs text-gray-300">
            <li className="flex items-start">
              <span className="mr-1.5 text-emerald-400">•</span>
              <span>Click the icon to switch between min & max</span>
            </li>
            <li className="flex items-start">
              <span className="mr-1.5 text-emerald-400">•</span>
              <span>
                Filter Pokémon with stats that fall above or below your chosen
                stat
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <h2 className="font-chakra mb-3 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-xl font-bold text-transparent">
        Special Features
      </h2>
      <div className="space-y-4">
        {/* Randomiser */}
        <div className="rounded-lg border-l-4 border-pink-500 bg-zinc-700/30 p-3">
          <h3 className="mb-2 border-b border-zinc-700/50 pb-1 text-sm font-medium text-pink-300">
            Randomiser
          </h3>
          <ul className="ml-4 space-y-1 text-xs text-gray-300">
            <li className="flex items-start">
              <span className="mr-1.5 text-pink-400">•</span>
              <span>Upload your save file to see randomised abilities</span>
            </li>
            <li className="flex items-start">
              <span className="mr-1.5 text-pink-400">•</span>
              <span>
                Abilities with{" "}
                <span className="line-through">strikethrough</span> are
                unobtainable
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-1.5 text-pink-400">•</span>
              <span>Toggle between randomised and original abilities</span>
            </li>
          </ul>
        </div>

        {/* Shiny Toggle */}
        <div className="rounded-lg border-l-4 border-amber-500 bg-zinc-700/30 p-3">
          <h3 className="mb-2 border-b border-zinc-700/50 pb-1 text-sm font-medium text-amber-300">
            Shiny Toggle
          </h3>
          <ul className="ml-4 space-y-1 text-xs text-gray-300">
            <li className="flex items-start">
              <span className="mr-1.5 text-amber-400">•</span>
              <span>Click the shiny icon to toggle all sprite variants</span>
            </li>
            <li className="flex items-start">
              <span className="mr-1.5 text-amber-400">•</span>
              <span>Your preference is saved between sessions</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);

const HelpPanel = () => {
  const isHelpOpen = useUIStore((state) => state.isHelpOpen);
  useBodyScrollLock(isHelpOpen);

  const closeHelp = useUIStore((state) => state.closeHelp);

  return (
    <Dialog open={isHelpOpen} onClose={closeHelp} className="relative z-50">
      {/* Background overlay with subtle blur */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

      {/* Dialog positioning */}
      <div className="no-scrollbar fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="no-scrollbar max-h-[85dvh] w-full max-w-md overflow-hidden rounded-2xl bg-zinc-800 shadow-xl ring-1 ring-white/10 transition-all">
          {/* Fixed header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-700/40 bg-zinc-800/95 p-6 pb-3 backdrop-blur-sm">
            <DialogTitle className="font-chakra bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text text-2xl font-bold text-transparent">
              Help
            </DialogTitle>
            <CloseButton onClick={closeHelp} />
          </div>

          {/* Scrollable content */}
          <div className="no-scrollbar max-h-[calc(85dvh-76px)] overflow-y-auto px-6 pb-6 pt-4">
            <HelpContent />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default HelpPanel;
