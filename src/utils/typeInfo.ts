// Utility to get type data for Pokémon
// Inspo:
// https://raw.githubusercontent.com/iriv24/pokeemerald-expansion/refs/heads/master/graphics/interface/menu_info.png
// https://www.spriters-resource.com/game_boy_advance/pokemonrubysapphire/sheet/64357/

import typeData from "../data/typeData.json";
import { TypeData } from "../types";

export const typeDataArray: TypeData[] = [];
Object.entries(typeData).forEach(([id, data]) => {
  typeDataArray[Number(id)] = data;
});

const validTypes = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18,19
];

export function getTypeName(typeID: number): string {
  return typeDataArray[typeID]?.typeName || "Normal"; //Normal in case of fallback
}

export function getTypeColor(typeID: number): [string, string] {
  const typeColor = [
    typeDataArray[typeID]?.color || "#A8A77A",
    typeDataArray[typeID]?.colorEnd || "#A8A878",
  ];

  return typeColor as [string, string];
}

function codeToMult(code: number): number {
  switch (code) {
    case 20:
      return 2;
    case 5:
      return 0.5;
    case 0:
      return 0;
    case 10:
      return 1;
    default:
      return 1;
  }
}

export function getDefensiveMatchup(typePair: [number, number?]) {
  const result: Record<number, number> = {};
  for (const [atkID, typeData] of typeDataArray.entries()) {
    if (!validTypes.includes(Number(atkID))) continue;
    const { matchup } = typeData;
    const multipliers = typePair
      .filter((t): t is number => t !== undefined)
      .map((t) => codeToMult(matchup[t]));
    const total = multipliers.reduce((a, b) => a * b, 1);
    result[atkID] = total;
  }
  return result;
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

const typeColors: Record<number, string> = {
  1: '#cecac5',
  2: '#d69e9c',
  3: '#adc6ef',
  4: '#bd8ec5',
  5: '#debe8c',
  6: '#ce966b',
  7: '#bdd25a',
  8: '#a5aade',
  9: '#adc2bd',
  11: '#ef8263',
  12: '#7bcee6',
  13: '#84c28c',
  14: '#efe363',
  15: '#f792ad',
  16: '#9cdfd6',
  17: '#7bb2e6',
  18: '#a5aaad',
  19: '#f7b6ef',
};

export function getTypeSnapColor(typeID: number): string {
  return typeColors[typeID] || '#cecac5'; // Default to Normal color if not found
}

