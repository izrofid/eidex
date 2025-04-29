// Utility to get type data for Pokémon
// Inspo:
// https://raw.githubusercontent.com/iriv24/pokeemerald-expansion/refs/heads/master/graphics/interface/menu_info.png
// https://www.spriters-resource.com/game_boy_advance/pokemonrubysapphire/sheet/64357/
export const TYPE_INFO: {
  [id: number]: { id: number; name: string; color: string, colorEnd: string };
} = {
  0: { id: 0, name: "Normal", color: "#A8A77A", colorEnd: "#ACAC7B" },
  1: { id: 1, name: "Fighting", color: "#C22E28", colorEnd: "#C03028" },
  2: { id: 2, name: "Flying", color: "#ACAC7B", colorEnd: "#9CDEDE" },
  3: { id: 3, name: "Poison", color: "#A33EA1", colorEnd: "#FF5A8B" },
  4: { id: 4, name: "Ground", color: "#BDA439",colorEnd: "#E0C068" },
  5: { id: 5, name: "Rock", color: "#B6A136",colorEnd: "#BDA439" },
  6: { id: 6, name: "Bug", color: "#808F13",colorEnd: "#A8B820" },
  7: { id: 7, name: "Ghost", color: "#735797",colorEnd: "#705898" },
  8: { id: 8, name: "Steel", color: "#8C8C9E",colorEnd: "#B8B8D0" },
  10: { id: 10, name: "Fire", color: "#EE8130",colorEnd: "#F08030" },
  11: { id: 11, name: "Water", color: "#6390F0",colorEnd: "#6890F0" },
  12: { id: 12, name: "Grass", color: "#398b31", colorEnd: "#62A13D" },
  13: { id: 13, name: "Electric", color: "#CF9A09",colorEnd: "#F8D030" },
  14: { id: 14, name: "Psychic", color: "#F95587",colorEnd: "#F85888" },
  15: { id: 15, name: "Ice", color: "#65A19E",colorEnd: "#98D8D8" },
  16: { id: 16, name: "Dragon", color: "#6F35FC",colorEnd: "#7038F8" },
  17: { id: 17, name: "Dark", color: "#705746",colorEnd: "#A040A0" },
  23: { id: 23, name: "Fairy", color: "#D685AD",colorEnd: "#A040A0" },
};

export function getTypeName(typeId: number): string {
  return TYPE_INFO[typeId]?.name || "Normal"; //Normal in case of fallback
}

export function getTypeColor(typeId: number): [string, string] {
  if (TYPE_INFO[typeId]?.color === undefined) {
    return ["#A8A77A", "#A8A878"]; // Normal's color in case of fallback
  }
  return [TYPE_INFO[typeId].color, TYPE_INFO[typeId].colorEnd];
}

export const adjustColor = (color: string, amount: number): string => {
  const clamp = (val: number): number => Math.min(255, Math.max(0, val));

  // Convert hex to RGB
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Adjust RGB values
  const newR = clamp(r + amount);
  const newG = clamp(g + amount);
  const newB = clamp(b + amount);

  // Convert back to hex
  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};
