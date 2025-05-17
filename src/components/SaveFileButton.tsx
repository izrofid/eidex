import { Button } from "@headlessui/react";
import React, { useRef } from "react";
import { MdCloudUpload } from "react-icons/md";
import { getTrainerIdFromSectors, MGBA_SIZE, splitSaveIntoChunks, TOTAL_SIZE } from "../randomiser/trainerIdExtractor";
import { useRandomiserStore } from "../stores/randomiserStore";

export function SaveFileButton({
  onSaveRead,
}: {
  onSaveRead: (buf: ArrayBuffer) => void;
}) {
  const setTrainerIdInfo = useRandomiserStore((state) => state.setTrainerIdInfo);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.click(); // trigger the hidden file input
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size !== TOTAL_SIZE && file.size !== MGBA_SIZE) {
      alert("Expected a 128KB .sav file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      try {
        // Extract and store trainer ID info
        const sectors = splitSaveIntoChunks(buffer);
        const trainerIdInfo = getTrainerIdFromSectors(sectors);


        setTrainerIdInfo(trainerIdInfo);
        
        // Continue with whatever other processing was happening
        onSaveRead(buffer);
      } catch (err) {
        alert("Failed to parse save: " + (err as Error).message);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      className="flex items-center min-w-15 justify-center gap-1 rounded bg-neutral-700 px-2 py-1 text-white hover:bg-gray-700 shadow-md/40"
      title="Upload .sav File"
    >
      <MdCloudUpload size={20} />
      <input
        type="file"
        accept=".sav"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </Button>
  );
}
