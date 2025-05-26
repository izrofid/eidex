import { useRandomiserStore } from "../stores/randomiserStore";
import CloseButton from "./CloseButton";
import { SaveFileButton } from "./SaveFileButton";
import {
  splitSaveIntoChunks,
  getTrainerIdFromSectors,
} from "@/randomiser/trainerIdExtractor";

function SaveInfo() {
  const trainerIdInfo = useRandomiserStore((state) => state.trainerIdInfo);
  const setTrainerIdInfo = useRandomiserStore(
    (state) => state.setTrainerIdInfo,
  );
  const disableRandomiserActive = useRandomiserStore(
    (state) => state.disableRandomiserActive,
  );

  return (
    <div className="flex select-none items-center justify-between rounded-md bg-card-backdrop px-3 py-2 text-xs text-gray-200 shadow-md">
      <div className="flex justify-evenly gap-2 sm:gap-3">
        {trainerIdInfo ? (
          <>
            <div className="flex items-center overflow-hidden rounded-full bg-zinc-700/90 shadow-sm">
              <span className="rounded-l-full bg-emerald-500 px-2 py-1 text-xs font-medium text-white">
                PID
              </span>
              <span className="px-2 py-1 font-mono text-xs text-emerald-300">
                {trainerIdInfo.trainerId.toString().padStart(5, "0")}
              </span>
            </div>
            {/* SID is hidden by default, visible on sm and up */}
            <div className="hidden items-center overflow-hidden rounded-full bg-zinc-700/90 shadow-sm sm:flex">
              <span className="rounded-l-full bg-purple-500 px-2 py-1 text-xs font-medium text-white">
                SID
              </span>
              <span className="px-2 py-1 font-mono text-xs text-purple-300">
                {trainerIdInfo.secretId.toString().padStart(5, "0")}
              </span>
            </div>
            <div className="flex items-center overflow-hidden rounded-full bg-zinc-700/90 shadow-sm">
              <span className="rounded-l-full bg-amber-500 px-2 py-1 text-xs font-medium text-white">
                TID
              </span>
              <span className="px-2 py-1 font-mono text-xs text-amber-300">
                {`0x${(trainerIdInfo.fullId >>> 0)
                  .toString(16)
                  .toUpperCase()
                  .padStart(8, "0")}`}
              </span>
            </div>
          </>
        ) : (
          <span className="font-normal text-gray-400">
            Upload a save to use the randomiser
          </span>
        )}
      </div>
      {trainerIdInfo ? (
        <CloseButton
          onClick={() => {
            disableRandomiserActive();
            setTrainerIdInfo(undefined);
          }}
        />
      ) : (
        <SaveFileButton
          onSaveRead={(buf: ArrayBuffer) => {
            try {
              const sectors = splitSaveIntoChunks(buf);
              const trainerInfo = getTrainerIdFromSectors(sectors);
              console.log(trainerInfo);
            } catch (e) {
              console.error(e);
            }
          }}
        />
      )}
    </div>
  );
}

export default SaveInfo;
