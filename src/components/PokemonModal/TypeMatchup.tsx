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
    <div className="border-3 border-neutral-600 my-5 w-full rounded-sm px-3 py-2 flex flex-col gap-4">
      {nonNeutralMultipliers.map((mult) =>
        groups[mult]?.length ? (
          <div key={mult} className="flex flex-row gap-2 p-2 select-none">
            <div className="w-14 flex-none text-center flex items-center justify-center bg-zinc-600 rounded-md">{multiplierLabels[mult]}</div>
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
