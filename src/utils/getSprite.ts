

function getSprite(id: number, isShiny: boolean = false): string {
  const spriteData = isShiny ? "sprites/front_shiny" : "sprites/front";
  return `${spriteData}/${id}.png`;
}

export default getSprite;