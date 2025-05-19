import React from "react";
import { FaRedditAlien } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { Button } from "@headlessui/react";

const HeaderBar: React.FC = () => (
  <header className="justify-betweeen select-none flex flex-row items-center justify-start gap-0 bg-neutral-900 px-4 py-4 font-sans tracking-tight text-gray-200 shadow-md">
    <div className="flex w-full items-center pb-0 pl-0">
      <img
        src="/public/icons/emploeon_posing.png"
        alt="Empoleon"
        className="mr-1 h-10 w-10 sm:mr-4 sm:h-12 sm:w-12"
      />
      <span className="m-0 text-base font-extrabold drop-shadow-lg sm:text-3xl sm:font-bold">
        Emerald{" "}
        <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
          Imperium
        </span>{" "}
        Online Dex
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
      href="https://discord.gg/Qw9eNGaRut"
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
