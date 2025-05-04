import { Pokemon } from "../../types";
import { parseEvolutions } from "../../utils/parseEvo";
import { getNameKey } from "../../utils/pokemonData";
import { getTypeSnapColor } from "../../utils/typeInfo";

interface EvolutionBoxProps {
  pokemon: Pokemon;
}

const EvolutionBox: React.FC<EvolutionBoxProps> = ({ pokemon }) => {

    const nameColor = getTypeSnapColor(pokemon.type[0]);

  return (
    <div className="evolution_box">

      {pokemon.evolutions ? (
        <div>
          {/* Evolution chain visualization will go here */}
          {pokemon.evolutions.map((evo) => {
            const evolutionDetails = parseEvolutions[evo[0]](evo);
            const evolutionTarget = getNameKey(evo[2]);
            return (
              <div key={evo[0]}>
                <p>
                  <span style={{color: nameColor}}>{evolutionTarget}</span>
                  {" "}
                  {evolutionDetails}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p>This Pokémon does not evolve.</p>
        </div>
      )}
    </div>
  );
};

export default EvolutionBox;
