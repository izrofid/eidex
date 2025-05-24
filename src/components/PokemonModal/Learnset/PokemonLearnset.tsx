import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Pokemon } from "../../../types";
import { memo } from "react";
import LevelUpMoves from "./LevelUpMoves";
import TMMoves from "./TMMoves";
import EggMoves from "./EggMoves";

type PokemonLearnsetProps = {
  pokemon: Pokemon;
};

const tabConfig = [
  { label: "Level Up", Component: LevelUpMoves },
  { label: "TMs & HMs", Component: TMMoves },
  { label: "Egg Moves", Component: EggMoves },
];

const PokemonLearnset = memo(({ pokemon }: PokemonLearnsetProps) => {
  return (
    <div className="w-full">
      <TabGroup>
        <TabList className="flex gap-1 border-b-1 border-gray-500 pb-2">
          {tabConfig.map((tab) => (
            <Tab
              key={tab.label}
              className="data-selected:bg-slate-700 my-2 flex-1 cursor-pointer rounded-xl py-2 text-center text-sm font-medium text-gray-200 outline-none transition-colors hover:bg-slate-500 active:bg-indigo-500"
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="">
          {tabConfig.map(({ label, Component }) => (
            <TabPanel key={label}>
              <Component pokemon={pokemon} />
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
});

export default PokemonLearnset;
