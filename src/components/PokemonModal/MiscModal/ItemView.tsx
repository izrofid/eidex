import { Pokemon } from "@/types";
import { getItemName } from "@/utils/itemUtils";

type ItemViewProps = {
  pokemon: Pokemon;
};

const ItemView = ({ pokemon }: ItemViewProps) => {
  const commonItem = pokemon.heldItems[0];
  const rareItem = pokemon.heldItems[1];

  return (
    <>
      <div className="flex justify-evenly gap-5 px-4 py-3">
        <div className="flex min-w-[7ch] -skew-x-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 hover:brightness-60 px-3 py-1 text-gray-100 shadow-md">
          <div className="font-chakra skew-x-12 text-sm font-medium tracking-wide">
            {getItemName(commonItem)}
          </div>
        </div>
        <div className="flex min-w-[7ch] -skew-x-12 items-center justify-center rounded-lg bg-gradient-to-r from-pink-700 to-pink-600 hover:brightness-60 px-3 py-1 text-gray-100 shadow-md">
          <div className="font-chakra skew-x-12 text-sm font-medium tracking-wide">
            {getItemName(rareItem)}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemView;
