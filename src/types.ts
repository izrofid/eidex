export interface PokemonChanges {
  stats?: number[];
  type?: number[];
  abilities?: (string | number[])[];
}

export type SortBy = "dexId" | "name" | "stat" | "index";

export type Ability = number;
export type Abilities = Ability[];

export type MoveSource = "all" | "levelup" | "tm" | "tutor";

export interface Pokemon {
  index: number;
  speciesName: string;
  types: number[];
  stats: number[];
  abilities: Abilities;
  levelUpMoves: number[][];
  tmMoves?: number[];
  eggMoves?: number[] | null;
  dexId: number;
  evolutions?: number[][] | null;
  forms?: string[] | null;
  formId?: number;
  nameKey: string;
  eggGroup?: number[];
  items?: number[];
  tutorMoves?: number[];
  ancestor?: number;
  order?: number;
  changes?: PokemonChanges | string;
}

export interface SpeciesData {
  [id: string]: Pokemon;
}

export interface FilterOptions {
  name?: string;
  typeId?: number;
  minStat?: number;
  sortBy?: SortBy;
  statType?: string;
  sortStat?: string;
  ability?: string;
  abilityId?: number;
  levelupMove?: string;
  tmMove?: string;
  tutorMove?: string;
  moveName?: string;
  moveId?: number;
  moveSource?: MoveSource;
}

export interface Move {
  id: number;
  name: string;
  description: string | null;
  power: number;
  type: number;
  cat: number;
  acc: number;
  pp?: number;
  secondaryEffectChance?: number;
  target?: number;
  priority?: number;
  properties?: string[];
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
  description?: string;
}

export type ItemData = Record<string, Item>;
export type ItemMap = Record<string, number>;
