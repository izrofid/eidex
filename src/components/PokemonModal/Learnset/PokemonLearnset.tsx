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
  { label: "Level", Component: LevelUpMoves },
  { label: "TMs", Component: TMMoves },
  { label: "Breed", Component: EggMoves },
];

const PokemonLearnset = memo(({ pokemon }: PokemonLearnsetProps) => {
  return (
    <div className="w-full">
      <TabGroup>
        <TabList className="relative flex rounded-md bg-zinc-800/30 overflow-clip">
          {tabConfig.map((tab) => (
            <Tab
              key={tab.label}
              className={({ selected }) =>
              `relative flex-1 cursor-pointer px-3 py-2 text-sm font-medium transition-all duration-200
              ${
                selected
                ? 'bg-zinc-700 text-white shadow-sm border-b-2 border-sky-400'
                : 'text-gray-200 border-b-2 border-transparent bg-zinc-800 hover:bg-zinc-700 hover:text-white'
              }
              focus:outline-none`
              }
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-4">
          {tabConfig.map(({ label, Component }) => (
            <TabPanel 
              key={label}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 rounded-lg"
            >
              <Component pokemon={pokemon} />
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
});

export default PokemonLearnset;
