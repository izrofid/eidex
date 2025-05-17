import { MdClose } from "react-icons/md";
import { useRandomiserStore } from "../stores/randomiserStore";

function SaveInfo() {
  const trainerIdInfo = useRandomiserStore((state) => state.trainerIdInfo);
  const setTrainerIdInfo = useRandomiserStore((state) => state.setTrainerIdInfo);
  const disableRandomiserActive = useRandomiserStore((state)=> state.disableRandomiserActive);

  return (
    <div className="border-1 shadow-xl/65 flex select-none items-center justify-between rounded-md border-neutral-800 bg-zinc-700/70 px-3 py-2 text-sm text-gray-200">
      <div className="flex gap-3">
        {trainerIdInfo && (
          <>
            <div>
              <span className="text-emerald-400">
                {trainerIdInfo.trainerId.toString().padStart(5, "0")}
              </span>
            </div>
            <div>
              <span className="text-purple-300">
                {trainerIdInfo.secretId.toString().padStart(5, "0")}
              </span>
            </div>
            <div>
              <span className="text-amber-400">
                0x
                {trainerIdInfo.fullId
                  .toString(16)
                  .toUpperCase()
                  .padStart(8, "0")}
              </span>
            </div>
          </>
        )}
        {!trainerIdInfo && <span className="text-gray-100">Save file not uploaded</span>}
      </div>
      {trainerIdInfo && (
        <div
          className="text-gray-200 transition-colors hover:text-red-500 active:text-fuchsia-500"
          onClick={() => {
            disableRandomiserActive();
            setTrainerIdInfo(undefined);
          }}
        >
          <MdClose size={20} />
        </div>
      )}
    </div>
  );
}

export default SaveInfo;
