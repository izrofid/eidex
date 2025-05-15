import { Pokemon } from "@/types";
import SpriteImage from "../SpriteImage";

type EvolutionProps = {
  onClick: () => void;
  pokemon: Pokemon;
  requirements?: string;
  details?: string;
};

const Evolution = ({
  onClick,
  pokemon,
}: EvolutionProps) => {

  return (
    <div
      className="flex flex-col items-center justify-center rounded-md bg-neutral-700 p-1 text-center md:p-3"
      onClick={onClick}
    >
      <div className="h-[64px] w-[64px] flex items-center">
        <SpriteImage pokemon={pokemon} className="mx-auto"/>

      </div>
    </div>
  );
};

export default Evolution;
