import { EvolutionFamily } from "@/utils/evoFamily";
import { parseEvolutions } from "../../../utils/parseEvo";
import { getNameKey, getSpeciesData } from "../../../utils/speciesUtils";
import { getTypeSnapColor } from "../../../utils/typeInfo";

interface EvolutionDetailsProps {
  evoFamily: EvolutionFamily;
}

const EvolutionDetails: React.FC<EvolutionDetailsProps> = ({ evoFamily }) => {
  const flatMembers = evoFamily.members;
  const noEvo = evoFamily.members.length < 2;

  return (
    <div
      className={`neutral-box rounded-md p-2 ${noEvo ? "hidden" : ""} text-gray-200 text-sm`}
    >
      {flatMembers.map((member) => {
        let pokemon;
        try {
          pokemon = getSpeciesData(member.id);
        } catch {
          return null;
        }
        const nameColor = getTypeSnapColor(pokemon.types[0]);
        return (
          <div key={member.id} className="">
            {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
              <ul>
                {pokemon.evolutions.map((evo) => {
                  const evolutionDetails = parseEvolutions[evo[0]](evo);
                  const evolutionTarget = getNameKey(evo[1]);
                  return (
                    <li key={`${evo[0]}-${evo[1]}-${evo[2]}`} className="flex flex-col py-1">
                      <span>
                        <span style={{ color: nameColor, fontWeight: 'bold' }}>{pokemon.nameKey}</span>
                        {" → "}
                        <span style={{ color: nameColor, fontWeight: 'bold' }}>{evolutionTarget}</span>
                        <span className="italic">{evolutionDetails ? ` (${evolutionDetails})` : null}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul></ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EvolutionDetails;
