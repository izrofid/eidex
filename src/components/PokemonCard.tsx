import { TypeBadge } from "./TypeBadge";

type PokemonCardProps = {
  id: number;
  name: string;
  types: number[];
  sprite: string;
  stats: number[]; // [HP, Atk, Def, Spe, SpA, SpD]
  abilities: number[][];
};

export function PokemonCard({
  id,
  name,
  types,
  sprite,
  stats,
  abilities,
}: PokemonCardProps) {
  // Convert the ID to a string and pad it with leading zeros and a #
  const formattedId = `#${String(id).padStart(3, "0")}`;

  const statLabels = ["HP", "Atk", "Def", "Spe", "SpA", "SpD"];

  // Calculate the BST (Base Stat Total)
  const bst = stats.reduce((sum, stat) => sum + stat, 0);

  return (
    <div className="mx-auto flex w-2/5 flex-col text-white shadow-lg">
      {/* Header */}
      <div className="flex justify-between bg-gray-900 py-3">
        <div className="flex items-center">
          {/* Sprite and name  */}
          <img src={sprite} className="h-13 w-13" />
          <div className="text-md font-bold">{name}</div>

          {/* Types */}
          <div className="flex items-center gap-1 px-2">
            {types.map((typeId: number, index: number) => (
              <div key={index}>
                <TypeBadge typeId={typeId} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center px-3">{formattedId}</div>
      </div>

      {/* Card body */}
      <div className="bg-gray-800 px-3">
        {/* Stats here */}
        <div className="my-2 flex flex-col">
          <div className="flex gap-4 text-center">
            {stats.map((statValue, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-sm italic">{statValue}</div>
                <div className="text-sm font-bold">{statLabels[index]}</div>
              </div>
            ))}
            {/* After all the stats, add one extra box for BST */}
            <div className="flex flex-col items-center">
              <div className="text-sm italic font-bold">{bst}</div>
              <div className="text-sm font-bold text-amber-400">BST</div>
            </div>
          </div>
        </div>

        <div>
          {/* Abilities */}
          {abilities.map(([abilityId, flag]: number[], index: number) => (
            <div key={index}>{abilityId}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
