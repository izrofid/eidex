import { Pokemon } from "../types";
import { getMoveData, getTMMove, getTutorMove } from "../utils/moveData";

export const generateTabsData = (pokemon: Pokemon) => [
  {
    label: "Level Up",
    content: (
      <div className="text-center font-bold text-white">
        {pokemon.levelupMoves.length > 0 ? (
          <ul>
            {pokemon.levelupMoves.map(([moveId, level]: number[], index) => {
              const move = getMoveData(moveId);
              return (
                <li key={`1-${index}`}>
                  Level {level}: {move.name}
                </li>
              );
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
    content: (
      <div className="text-center font-bold text-white">
        {pokemon.tmMoves && pokemon.tmMoves.length > 0 ? (
          <ul>
            {pokemon.tmMoves.map((moveIndex, index) => {
              const move = getTMMove(moveIndex);
              return move ? <li key={`2-${index}`}>{move.name}</li> : null;
            })}
          </ul>
        ) : (
          "No TM/HM Moves Available"
        )}
      </div>
    ),
  },
  {
    label: "Tutor",
    content: (
      <div className="text-center font-bold text-white">
        {(pokemon.tutorMoves ?? []).length > 0 ? (
          <ul>
            {(pokemon.tutorMoves ?? []).map((moveIndex, index) => {
              const move = getTutorMove(moveIndex);
              return move ? <li key={`3-${index}`}>{move.name}</li> : null;
            })}
          </ul>
        ) : (
          "No Tutor Moves Available"
        )}
      </div>
    ),
  },
  {
    label: "Egg Moves",
    content: (
      <div className="text-center font-bold text-white">
        {(pokemon.eggMoves ?? []).length > 0 ? (
          <ul>
        {(pokemon.eggMoves ?? []).map((moveId, index) => {
          const move = getMoveData(moveId);
          return move ? <li key={`4-${index}`}>{move.name}</li> : null;
        })}
          </ul>
        ) : (
          "No Egg Moves Available"
        )}
      </div>
    ),
  },
];
