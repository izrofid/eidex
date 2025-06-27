// Core filter options interface
export interface FilterOptions {
  name: string;
  typeIds: [number?, number?];
  chosenStat: number | undefined;
  statType: string | undefined;
  isStatMax: boolean;
  sortBy: SortBy;
  sortStat: string | undefined;
  sortDescending: boolean;
  moveSource: MoveSource;
  moveIds: number[];
  moveNames: string[];
  megaCycle: boolean | undefined;
  nfeCycle: boolean | undefined;
  heldItem: number;
  abilityId?: number;
  ability?: string;
}

// Enums and specific types
export type MoveSource = "all" | "levelup" | "tm" | "egg";
export type SortBy = "dexId" | "name" | "stat";
export type MoveValue = {
  id: number;
  name: string;
  source: string;
};

// Base state containing only shared properties
export interface BaseFilterState {
  filters: FilterOptions;
}

// Slice-specific interfaces
export interface TypeOption {
  typeID: number | undefined;
  typeName: string;
}

export type FilterToggleState = "Include" | "Only";
export type FilterToggles = [boolean, boolean, boolean]; // [Evolved, Legend, Mega]
