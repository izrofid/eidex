// Utility to get type data for Pokémon
// Inspo:
// https://raw.githubusercontent.com/iriv24/pokeemerald-expansion/refs/heads/master/graphics/interface/menu_info.png
// https://www.spriters-resource.com/game_boy_advance/pokemonrubysapphire/sheet/64357/

import typeData from "../data/typeData.json";
import { TypeData } from "../types";

export const typeDataArray: TypeData[] = Object.values(typeData);

export function getTypeName(typeID: number): string {
  return typeDataArray[typeID]?.typeName || "Normal"; //Normal in case of fallback
}

export function getTypeColor(typeID: number): [string, string] {
  const typeColor = [typeDataArray[typeID]?.color || "#A8A77A", typeDataArray[typeID]?.colorEnd || "#A8A878"];

  return typeColor as [string, string];
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
