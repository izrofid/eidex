import { MdClose } from "react-icons/md";
import { useRandomiserStore } from "../stores/randomiserStore";

function SaveInfo() {
  const trainerIdInfo = useRandomiserStore((state) => state.trainerIdInfo);
  const setTrainerIdInfo = useRandomiserStore((state) => state.setTrainerIdInfo);
  const disableRandomiserActive = useRandomiserStore((state) => state.disableRandomiserActive);

  return (
    <div className="border flex select-none items-center justify-between rounded-md border-neutral-500 bg-zinc-800/80 px-2 py-2 text-xs text-gray-200 shadow">
      <div className="flex gap-2 sm:gap-4 justify-evenly">
        {trainerIdInfo ? (
          <>
        <div className="flex items-center rounded-full bg-emerald-600/10 border border-emerald-500/40 shadow-sm overflow-hidden">
          <span className="bg-emerald-500 text-white px-1 py-1 font-bold text-xs rounded-l-lg">PID</span>
          <span className="px-2 py-1 font-mono text-emerald-300 font-semibold">{trainerIdInfo.trainerId.toString().padStart(5, "0")}</span>
        </div>
        {/* SID is hidden by default, visible on sm and up */}
        <div className="hidden sm:flex items-center rounded-full bg-purple-600/10 border border-purple-500/40 shadow-sm overflow-hidden">
          <span className="bg-purple-500 text-white px-1 py-1 font-bold text-xs rounded-l-lg">SID</span>
          <span className="px-2 py-1 font-mono text-purple-300 font-semibold">{trainerIdInfo.secretId.toString().padStart(5, "0")}</span>
        </div>
        <div className="flex items-center rounded-full bg-amber-600/10 border border-amber-500/40 shadow-sm overflow-hidden">
          <span className="bg-amber-500 text-white px-1 py-1 font-bold text-xs rounded-l-lg">TID</span>
          <span className="px-2 py-1 font-mono text-amber-300 font-semibold">0x{trainerIdInfo.fullId.toString(16).toUpperCase().padStart(8, "0")}</span>
        </div>
          </>
        ) : (
          <span className="text-gray-400 italic">Upload a save to use the randomiser</span>
        )}
      </div>
      {trainerIdInfo && (
        <button
          className="ml-2 rounded-full p-0.5 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          onClick={() => {
            disableRandomiserActive();
            setTrainerIdInfo(undefined);
          }}
          aria-label="Clear save info"
        >
          <MdClose size={16} />
        </button>
      )}
    </div>
  );
}

export default SaveInfo;
