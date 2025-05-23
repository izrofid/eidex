import { Button } from "@headlessui/react";
import React, { useEffect, useRef } from "react";
import { MdCloudUpload } from "react-icons/md";
import { getTrainerIdFromSectors, MGBA_SIZE, splitSaveIntoChunks, TOTAL_SIZE } from "../randomiser/trainerIdExtractor";
import { useRandomiserStore } from "../stores/randomiserStore";

export function SaveFileButton({
  onSaveRead,
}: {
  onSaveRead: (buf: ArrayBuffer) => void;
}) {
  const setTrainerIdInfo = useRandomiserStore((state) => state.setTrainerIdInfo);
  const trainerIdInfo = useRandomiserStore((state) => state.trainerIdInfo);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Reset file input when trainerIdInfo changes to null
  useEffect(() => {
    if (!trainerIdInfo && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [trainerIdInfo]);

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
      className="flex items-center w-max justify-center rounded cursor-pointer text-white hover:text-emerald-500"
      title="Upload .sav File"
    >
      <MdCloudUpload size={21} />
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
