import { TypeBadge } from "./TypeBadge";
import { getAbilityName } from "../utils/abilityData";

type PokemonCardProps = {
  id: number;
  name: string;
  types: number[];
  sprite: string;
  stats: number[]; // [HP, Atk, Def, Spe, SpA, SpD]
  abilities: [number, number][];
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

  const reorderedAbilities = [...abilities.slice(1), abilities[0]];

  // If the sprite is "", then use the default sprite
  const fallbackSprite = "/eidex/missingno.png";

  return (
    <div className="w-full flex flex-col text-white">
      {/* Header */}
      <div className="flex justify-between bg-gray-900 px-2 py-3">
        <div className="flex items-center gap-2">
          {/* Sprite and name  */}
          <img
            src={sprite || fallbackSprite}
            className="h-14 w-14 object-contain p-1"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackSprite;
            }}
          />
          <div className="text-md font-bold">{name}</div>

          {/* Types */}
          <div className="flex flex-row items-center gap-1 px-2 max-sm:flex-col">
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
      <div className="bg-gray-800 px-5 py-3">
        <div className="flex flex-row gap-5 py-2">
          {/* Abilities */}
          {reorderedAbilities.map(
            ([abilityId, abilityIndex], index: number) => {
              const name = getAbilityName([abilityId, abilityIndex]);
              const isHidden = index === reorderedAbilities.length - 1; // last one = Hidden

              return (
                <div
                  key={index}
                  className={`text-left italic ${
                    isHidden ? "font-semibold text-pink-400" : ""
                  }`}
                >
                  {name}
                </div>
              );
            },
          )}
        </div>

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
              <div className="text-sm font-bold italic">{bst}</div>
              <div className="text-sm font-bold text-amber-400">BST</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
