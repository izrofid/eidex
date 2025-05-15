import { useState, useEffect } from "react";
import getSprite from "@/utils/getSprite";
import { useUIStore } from "@/stores/uiStore";

export function useSprite(index: number) {
  const [spriteUrl, setSpriteUrl] = useState<string>("");
  const isShiny = useUIStore((state) => state.isShiny);

  useEffect(() => {
    let isMounted = true;
    getSprite(index, isShiny).then((url) => {
      if (isMounted) setSpriteUrl(url);
    });
    return () => { isMounted = false; };
  }, [index, isShiny]);

  return spriteUrl;
}