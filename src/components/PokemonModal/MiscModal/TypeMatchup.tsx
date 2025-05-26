// Component to show a single pokemon's type matchups with data from typeInfo.ts
import { getDefensiveMatchup} from "../../../utils/typeInfo";
import { TypeBadge } from "../../TypeBadges/TypeBadge";

import { Pokemon } from "../../../types";
import { useScreenWidth } from "../../../hooks/useScreenWidth";

type Props = {
  pokemon: Pokemon;
};

const multiplierLabels: Record<number, string> = {
  0: "x0",
  0.25: "x¼",
  0.5: "x½",
  2: "x2",
  4: "x4",
};

const multiplierColors: Record<number, string> = {
  0: "bg-fuchsia-800", // Immune
  0.25: "bg-teal-600", // Very resistant
  0.5: "bg-green-600", // Resistant
  2: "bg-red-700", // Weak
  4: "bg-pink-800", // Very weak
};

const nonNeutralMultipliers = [0, 0.25, 0.5, 2, 4];

const TypeMatchup: React.FC<Props> = ({ pokemon }) => {
  const matchup = getDefensiveMatchup(pokemon.types as [number, number?]);

  // Group types by multiplier
  const groups: Record<number, number[]> = {};
  Object.entries(matchup).forEach(([typeID, multiplier]) => {
    if (nonNeutralMultipliers.includes(Number(multiplier))) {
      if (!groups[multiplier]) groups[multiplier] = [];
      groups[multiplier].push((Number(typeID)));
    }
  });

  const screenWidth = useScreenWidth();

  return (
    <div className="w-full rounded-sm px-3 py-2 flex flex-col gap-4">
      {nonNeutralMultipliers.map((mult) =>
        groups[mult]?.length ? (
          <div key={mult} className="flex flex-row gap-2 p-2 select-none">
            <div 
              className={`w-14 flex-none text-center flex items-center justify-center rounded-lg font-medium text-white shadow-sm transition-all duration-200 ${multiplierColors[mult]}`}
            >
              {multiplierLabels[mult]}
            </div>
            <div className="flex gap-1 flex-wrap items-center">{groups[mult].map((typeId) => (
              <TypeBadge key={typeId} typeId={typeId} screenWidth={screenWidth} />
            ))}</div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default TypeMatchup;
