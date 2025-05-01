import { useState } from "react";
import CloseButton from "./CloseButton";
import useBodyScrollLock from "../hooks/useBodyScrollLock";

const CreditsContent = () => (
  <div className="">
    <p>
      These are the people whose contributions have been invaluable in helping
      make this tool.
    </p>
    <ul className="list-disc pl-5">
      <li className="list-item">
        jwow (For making the RR Dex which inspired this, and help with data)
      </li>
      <li className="list-item">Specker (UI and general advice)</li>
      <li className="list-item">Iriv24 for making the game!</li>
    </ul>
    <span className="text-md my-2 block font-bold">Special Thanks</span>
    <p className="">
      Everyone on the Emerald Imperium Discord for feedback and putting up with
      me
    </p>
  </div>
);

const CreditsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  useBodyScrollLock(isOpen);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleModal}
        className="font-pixel shadow-md/40 items-center rounded bg-neutral-700 px-2 text-white hover:bg-gray-700 select-none"
      >
        Credits
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={toggleModal}
        >
          <div
            className="relative w-full max-w-md rounded bg-zinc-800 p-6 text-gray-300 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xl font-semibold">Credits</span>
              <CloseButton onClick={toggleModal} />
            </div>
            <CreditsContent />
          </div>
        </div>
      )}
    </>
  );
};

export default CreditsButton;
