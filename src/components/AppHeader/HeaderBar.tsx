import React from "react";

const HeaderBar: React.FC = () => (
  <header className="flex w-full flex-col gap-0 items-center justify-start bg-neutral-900 px-4 py-4 font-sans tracking-tight text-gray-200 shadow-md">
    <div className="flex w-full pb-0">
      {" "}
      <img
        src="/public/icons/emploeon_posing.png"
        alt="Empoleon"
        className="mr-4 h-12 w-12"
      />
      <h1 className="font-gr m-0 text-3xl font-bold drop-shadow-lg">
        Emerald{" "}
        <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
          Imperium
        </span>{" "}
        Online Dex
      </h1>
    </div>
  </header>
);

export default HeaderBar;
