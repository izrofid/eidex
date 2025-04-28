import { Pokemon } from "../types";
import spritesData from "../data/sprites.json";
import shinySpritesData from "../data/shiny_sprites.json";

type PokemonModalProps = {
  pokemon: Pokemon | null;
  onClose: () => void;
  isShiny?: boolean;
};

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="absolute right-3 top-3 text-gray-400 hover:text-red-800 focus:outline-none"
      onClick={onClick}
      aria-label="Close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

function PokemonView({
  pokemon,
  isShiny,
}: {
  pokemon: Pokemon;
  isShiny: boolean;
}) {
  const shinySprite = `data:image/png;base64,${shinySpritesData[pokemon.id.toString() as keyof typeof shinySpritesData]}`;
  const regularSprite = `data:image/png;base64,${spritesData[pokemon.id.toString() as keyof typeof spritesData]}`;

  const displaySprite = isShiny ? shinySprite : regularSprite;
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={displaySprite}
        alt={pokemon.name}
        className="h-18 w-18 object-contain"
      />
      <div className="flex items-center gap-3">
        {" "}
        <div className="text-xl font-bold text-gray-200">{pokemon.name}</div>
        <div className="text-md text-gray-400">#{pokemon.id}</div>
      </div>
      {/* Add more details about the Pokemon here */}
    </div>
  );
}

export function PokemonModal({
  pokemon,
  onClose,
  isShiny = false,
}: PokemonModalProps) {
  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="w-xl relative my-5 h-[95dvh] max-h-screen justify-normal rounded-lg bg-neutral-800 p-6 border-gray-100 border">
        <CloseButton onClick={onClose} />
        <PokemonView pokemon={pokemon} isShiny={isShiny} />
      </div>
    </div>
  );
}
