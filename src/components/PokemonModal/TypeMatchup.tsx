// Component to show a single pokemon's type matchups with data from typeInfo.ts
import { getDefensiveMatchup} from "../../utils/typeInfo";
import { TypeBadge } from "../TypeBadges/TypeBadge";

import { Pokemon } from "../../types";
import { useScreenWidth } from "../../hooks/useScreenWidth";

type Props = {
  pokemon: Pokemon;
};

const multiplierLabels: Record<number, string> = {
  0.25: "x¼",
  0.5: "x½",
  2: "x2",
  4: "x4",
};

const multiplierColors: Record<number, string> = {
  0.25: "#16a34a", // green-600
  0.5: "#dda144", // yellow-600
  2: "#ef4444", // red-500
  4: "#991b1b", // red-800
};

const nonNeutralMultipliers = [0.25, 0.5, 2, 4];

const TypeMatchup: React.FC<Props> = ({ pokemon }) => {
  const matchup = getDefensiveMatchup(pokemon.type as [number, number?]);

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
    <div className="neutral-box w-full rounded-sm px-3 py-2 flex flex-col gap-4">
      {nonNeutralMultipliers.map((mult) =>
        groups[mult]?.length ? (
          <div key={mult} className="flex flex-row gap-2 p-2 select-none">
            <div className={`w-14 flex-none text-center flex items-center justify-center rounded-md text-white`} style={{ backgroundColor: multiplierColors[mult] }}>{multiplierLabels[mult]}</div>
            <div className="flex gap-1 flex-wrap items-center">{groups[mult].map((typeId) => (
              <TypeBadge key={typeId} typeId={typeId} screenWidth={screenWidth} />
            ))}</div>
          </div>
        ) : null,
      )}
    </div>
  );
};

export default TypeMatchup;
