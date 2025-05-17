import { MdClose } from "react-icons/md";
import { useRandomiserStore } from "../stores/randomiserStore";

function SaveInfo() {
  const trainerIdInfo = useRandomiserStore((state) => state.trainerIdInfo);

  if (!trainerIdInfo) {
    return <div className="text-sm text-neutral-500">No trainer ID loaded</div>;
  }

  return (
    <div className="border-1 select-none shadow-xl/65 items-center flex justify-between rounded-md border-neutral-800 bg-zinc-700/70 px-3 py-2 text-sm text-gray-200">
      <div className="flex gap-3">
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
            0x{trainerIdInfo.fullId.toString(16).toUpperCase().padStart(8, "0")}
          </span>
        </div>
      </div>
      <div className="text-gray-200 hover:text-red-500 active:text-fuchsia-500 transition-colors">
        <MdClose size={20} />
      </div>
    </div>
  );
}

export default SaveInfo;
