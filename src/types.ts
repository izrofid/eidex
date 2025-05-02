export interface PokemonChanges {
  stats?: number[];
  type?: number[];
  abilities?: (string | number[])[];
}

export type Ability = number[];
export type Abilities = Ability[];

export interface Pokemon {
  ID: number;
  name: string;
  stats: number[]; // [HP, Attack, Defense, Speed, Sp. Atk, Sp. Def]
  type: number[]; // Type IDs
  abilities: Abilities; // [Ability ID, index]
  eggGroup: number[]; // Egg group IDs
  items: number[]; // Item IDs
  levelupMoves: number[][]; // [Move ID, Level]
  evolutions?: number[][];
  tmMoves?: number[]; // TM IDs
  tutorMoves?: number[]; // Tutor move IDs
  nameKey: string; // Redundant name
  dexID: number; // National Dex ID
  ancestor: number; // Pre-evolution's ID
  eggMoves?: number[]; // Egg move IDs
  order?: number;
  changes?: PokemonChanges | string;
}

export interface FilterOptions {
  name?: string;
  typeId?: number;
  minStat?: number;
  statType?: string;
  ability?: string;
}

export interface Move {
  ID: number;
  name: string;
  power: number;
  type: number;
  accuracy: number;
  pp: number;
  secondaryEffectChance: number;
  target: number;
  priority: number;
  split: number;
  description: string;
}

export type MoveData = Record<string, Move>;
export type MoveMap = Record<string, number>;

export interface TypeData {
  typeID: number;
  typeName: string;
  color: string;
  colorEnd: string;
  matchup: number[];
}

export interface Item {
  ID: number;
  name: string;
  description: string;
}

export type ItemData = Record<string, Item>;
export type ItemMap = Record<string, number>;
