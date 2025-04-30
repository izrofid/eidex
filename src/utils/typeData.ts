// Utility to get type data for Pokémon
// Inspo:
// https://raw.githubusercontent.com/iriv24/pokeemerald-expansion/refs/heads/master/graphics/interface/menu_info.png
// https://www.spriters-resource.com/game_boy_advance/pokemonrubysapphire/sheet/64357/
export const TYPE_INFO: {
  [id: number]: { id: number; name: string; color: string; colorEnd: string };
} = {
  0: { id: 0, name: "Normal", color: "#757553", colorEnd: "#a8a878" },
  1: { id: 1, name: "Fighting", color: "#8d231d", colorEnd: "#c03028" },
  2: { id: 2, name: "Flying", color: "#816bb2", colorEnd: "#a890f0" },
  3: { id: 3, name: "Poison", color: "#6d2b6d", colorEnd: "#a040a0" },
  4: { id: 4, name: "Ground", color: "#ad9450", colorEnd: "#e0c068" },
  5: { id: 5, name: "Rock", color: "#847328", colorEnd: "#b8a038" },
  6: { id: 6, name: "Bug", color: "#798417", colorEnd: "#a8b820" },
  7: { id: 7, name: "Ghost", color: "#4a3a65", colorEnd: "#705898" },
  8: { id: 8, name: "Steel", color: "#8a8a9d", colorEnd: "#b8b8d0" },
  10: { id: 10, name: "Fire", color: "#bd6425", colorEnd: "#f08030" },
  11: { id: 11, name: "Water", color: "#5171bd", colorEnd: "#6890f0" },
  12: { id: 12, name: "Grass", color: "#59943b", colorEnd: "#78c850" },
  13: { id: 13, name: "Electric", color: "#c4a526", colorEnd: "#f8d030" },
  14: { id: 14, name: "Psychic", color: "#c4456c", colorEnd: "#f85888" },
  15: { id: 15, name: "Ice", color: "#74a4a4", colorEnd: "#98d8d8" },
  16: { id: 16, name: "Dragon", color: "#582cc4", colorEnd: "#7038f8" },
  17: { id: 17, name: "Dark", color: "#3c2f27", colorEnd: "#705848" },
  23: { id: 23, name: "Fairy", color: "#cc88cc", colorEnd: "#ffaaff" },
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
