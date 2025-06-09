import React from "react";
import { FaRedditAlien } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { Button } from "@headlessui/react";

const HeaderBar: React.FC = () => (
  <header className="justify-betweeen flex select-none flex-row items-center justify-start gap-0 bg-neutral-900 px-4 py-4 font-sans tracking-tight text-gray-200 shadow-md">
    <div className="font-chakra flex w-full items-center pb-0 pl-0 relative">
      <img
      src="icons/vivillionpride.png"
      alt="Vivillion Pride"
      className="mr-1 h-auto w-10 sm:mr-4 sm:w-12"
      />
      <span>
      {" "}
      <span className="m-0 whitespace-nowrap bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-base font-extrabold text-transparent drop-shadow-lg sm:text-2xl sm:font-bold">
        Emerald Imperium
      </span>
      {"  "}
      <span className="m-0 whitespace-nowrap bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-base font-extrabold text-transparent drop-shadow-lg sm:text-2xl sm:font-bold relative">
       Online Dex
      </span>
      </span>

    </div>
    <div className="mt-1 flex flex-row items-center gap-2 sm:mt-0">
      <Button
        as="a"
        href="https://www.reddit.com/r/EmeraldImperium"
        target="_blank"
        rel="noopener noreferrer"
        className="active:animate-pulse"
      >
        <FaRedditAlien
          size={22}
          className="relative top-[-1.6px] cursor-pointer hover:text-orange-500"
        />
      </Button>
      <Button
        as="a"
        href="https://discord.gg/emeraldimperium"
        target="_blank"
        rel="noopener noreferrer"
        className="active:animate-pulse"
      >
        <FaDiscord size={22} className="cursor-pointer hover:text-indigo-600" />
      </Button>
    </div>
  </header>
);

export default HeaderBar;
