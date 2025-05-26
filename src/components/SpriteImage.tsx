import React from "react";
import { useSprite } from "@/hooks/useSprite";
import { Pokemon } from "@/types";

type SpriteImageProps = {
  pokemon: Pokemon;
  className?: string;
  fallbackSrc?: string;
  mult?: number;
};

export default function SpriteImage({
  pokemon,
  className = "",
  fallbackSrc = "missingno.png",
  mult = 1,
}: SpriteImageProps) {

  const alt = pokemon.nameKey;
  const [imgError, setImgError] = React.useState(false);

  const spriteUrl = useSprite(pokemon.speciesId);

  const size = mult * 64

  if (!spriteUrl && !imgError) {
    return (
      <div
        className={`flex items-center justify-center rounded ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="h-8 w-8 animate-spin bg-transparent rounded-full border-b-2 border-gray-200" />
      </div>
    );
  }

  return (
    <img
      src={imgError ? fallbackSrc : spriteUrl}
      alt={alt}
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
      onError={() => setImgError(true)}
    />
  );
}
