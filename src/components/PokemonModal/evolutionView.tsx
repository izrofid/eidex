import { EvolutionFamily } from "../../utils/evoFamily";
import getSprite from "../../utils/getSprite";
import { FaArrowRight } from "react-icons/fa";
// import { Pokemon } from "../../types";
// import speciesData from "../../data/speciesData.json";

interface EvolutionViewProps {
  family: EvolutionFamily;
  isShiny: boolean;
  onClickPokemon?: (pokemonId: number) => void;
}

const EvolutionView: React.FC<EvolutionViewProps> = ({ family, isShiny = false, onClickPokemon }) => {
  // Group members by stage
  const stages: Record<number, typeof family.members> = {};
  family.members.forEach(member => {
    if (!stages[member.stage]) stages[member.stage] = [];
    stages[member.stage].push(member);
  });

  const sortedStages = Object.keys(stages)
    .map(Number)
    .sort((a, b) => a - b);

  // Build the columns and arrows in a flat array
  const columnsWithArrows: React.ReactNode[] = [];
  sortedStages.forEach((stage, idx) => {
    columnsWithArrows.push(
      <div key={stage} className="flex flex-col items-center cursor-pointer">
        {stages[stage].map(member => (
          <div key={member.id} className="text-center bg-neutral-700 p-3 my-1 rounded-md" 
          onClick={() => onClickPokemon?.(member.id)}>
            <img
              src={getSprite(member.id, isShiny)}
              alt={member.name}
              className="w-[64px] h-[64px] object-contain"
            />
          </div>
        ))}
      </div>
    );
    if (idx < sortedStages.length - 1) {
      columnsWithArrows.push(
        <FaArrowRight key={`arrow-${stage}`} className="text-2xl mx-2" />
      );
    }
  });

  return (
    <div className="flex flex-row text-white items-center justify-evenly bg-neutral-900/30 p-2 py-3 rounded-md border-neutral-600 border-1">
      {columnsWithArrows}
    </div>
  );
};

export default EvolutionView;