export interface PokemonChanges {
  stats?: number[];
  type?: number[];
  abilities?: (string | number[])[];
}

export interface Pokemon {
  ID: number;
  name: string;
  stats: number[]; // [HP, Attack, Defense, Speed, Sp. Atk, Sp. Def]
  type: number[]; // Type IDs
  abilities: number[][]; // [Ability ID, index]
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
