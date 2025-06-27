export interface PokemonChanges {
  stats?: number[];
  type?: number[];
  abilities?: (string | number[])[];
}

export type SortBy = "dexId" | "name" | "stat" | "speciesId";

export type StatArray = [number, number, number, number, number, number];

export type Ability = number;
export type Abilities = Ability[];

export type MoveSource = "all" | "levelup" | "tm" | "egg";

export interface Pokemon {
  speciesId: number;
  speciesName: string;
  types: number[];
  stats: number[];
  abilities: Abilities;
  heldItems: number[];
  levelUpMoves: number[][];
  tmMoves?: number[];
  eggMoves?: number[] | null;
  dexId: number;
  evolutions?: number[][] | null;
  forms?: string[] | null;
  siblings?: number[];
  baseForm?: number;
  formId?: number;
  nameKey: string;
  eggGroup?: number[];
  items?: number[];
}

export interface SpeciesData {
  [id: string]: Pokemon;
}

export interface FilterOptions {
  name?: string;
  typeIds?: [number?, number?];
  chosenStat?: number;
  sortBy?: SortBy;
  statType?: string;
  isStatMax?: boolean;
  sortStat?: string;
  ability?: string;
  abilityId?: number;
  levelupMove?: string;
  tmMove?: string;
  sortDescending?: boolean;
  tutorMove?: string;
  moveNames?: string[];
  moveIds?: number[];
  moveSource?: MoveSource;
  heldItem?: number;
  megaCycle?: boolean | undefined;
  nfeCycle?: boolean | undefined;
}

export interface Move {
  moveId: number;
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
