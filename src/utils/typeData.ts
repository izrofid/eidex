// Utility to get type data for Pokémon

export const TYPE_INFO: { [id: number]: { name: string; color: string } } = {
  0: { name: "Normal", color: "#A8A77A" },
  1: { name: "Fighting", color: "#C22E28" },
  2: { name: "Flying", color: "#8571BE" },
  3: { name: "Poison", color: "#A33EA1" },
  4: { name: "Ground", color: "#B1954F" },
  5: { name: "Rock", color: "#B6A136" },
  6: { name: "Bug", color: "#808F13" },
  7: { name: "Ghost", color: "#735797" },
  8: { name: "Steel", color: "#8C8C9E" },
  10: { name: "Fire", color: "#EE8130" },
  11: { name: "Water", color: "#6390F0" },
  12: { name: "Grass", color: "#62A13D" },
  13: { name: "Electric", color: "#CF9A09" },
  14: { name: "Psychic", color: "#F95587" },
  15: { name: "Ice", color: "#65A19E" },
  16: { name: "Dragon", color: "#6F35FC" },
  17: { name: "Dark", color: "#705746" },
  23: { name: "Fairy", color: "#D685AD" },
};

export function getTypeName(typeId: number): string {
  return TYPE_INFO[typeId]?.name || "Normal"; //Normal in case of fallback
}

export function getTypeColor(typeId: number): string {
  return TYPE_INFO[typeId]?.color || "#A8A77A"; // Normal's color in case of fallback
}

export const adjustColor = (color: string, amount: number): string => {
    const clamp = (val: number): number => Math.min(255, Math.max(0, val));
    
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Adjust RGB values
    const newR = clamp(r + amount);
    const newG = clamp(g + amount);
    const newB = clamp(b + amount);
    
    // Convert back to hex
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };