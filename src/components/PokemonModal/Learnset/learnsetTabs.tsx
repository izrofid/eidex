import { findRootSpecies } from "@/utils/evoFamily";
import { Pokemon } from "../../../types";
import { getMoveData } from "../../../utils/moveData";
import MoveEntry from "./MoveEntry";
import { getSpeciesData } from "@/utils/speciesUtils";

export const buildPokemonMoveTabs = (pokemon: Pokemon) => {
  // Only create object with label and a function to generate content
  return [
    {
      label: "Level Up",
      // Pass a function instead of pre-rendered content
      contentFn: () => (
        <div className="text-center font-bold text-white">
          {pokemon.levelUpMoves.length > 0 ? (
            <ul>
              {pokemon.levelUpMoves.map((arr, index) => {
                const [moveId, level] = arr;
                const move = getMoveData(moveId);
                return move ? (
                  <li key={`1-${index}`}>
                    <MoveEntry move={move} level={level} />
                  </li>
                ) : null;
              })}
            </ul>
          ) : (
            "No Level-Up Moves Available"
          )}
        </div>
      ),
    },
    {
      label: "TMs & HMs",
      contentFn: () => (
        <div className="text-center font-bold text-white">
          {pokemon.tmMoves && pokemon.tmMoves.length > 0 ? (
            <ul>
              {pokemon.tmMoves.map((moveIndex, index) => {
                const move = getMoveData(moveIndex);
                return move ? (
                  <li key={`2-${index}`}>
                    <MoveEntry move={move} />
                  </li>
                ) : null;
              })}
            </ul>
          ) : (
            "No TM/HM Moves Available"
          )}
        </div>
      ),
    },
    {
      label: "Egg Moves",
      contentFn: () => (
        <div className="text-center font-bold text-white">
          {(() => {
            const rootSpeciesId = findRootSpecies(pokemon.index);
            const rootSpecies = getSpeciesData(rootSpeciesId);
            return (rootSpecies.eggMoves ?? []).length > 0 ? (
              <ul>
                {(rootSpecies.eggMoves ?? []).map((moveId, index) => {
                  const move = getMoveData(moveId);
                  return move ? (
                    <li key={`3-${index}`}>
                      <MoveEntry move={move} />
                    </li>
                  ) : null;
                })}
              </ul>
            ) : (
              "No Egg Moves Available"
            );
          })()}
        </div>
      ),
    },
  ];
};
