import sprites from "../data/sprites.json";
import shinySprites from "../data/shinySprites.json";

function getSprite(id: number, isShiny: boolean = false): string {
  const spriteData = isShiny ? shinySprites : sprites;
  const base64Sprite = spriteData[id.toString() as keyof typeof spriteData];
  return `data:image/png;base64,${base64Sprite}`;
}

export default getSprite;