// Core filter options interface
export interface FilterOptions {
  name: string;
  typeIds: [number?, number?];
  chosenStat: number | undefined;
  statType: string | undefined;
  isStatMax: boolean;
  sortBy: SortBy;
  sortStat: string | undefined;
  descending: boolean;
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
export type MoveSource = "all" | "level" | "tm" | "tutor" | "egg";
export type SortBy = "dexId" | "name" | "stat";

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

// Helper type for creating slices
export type StateCreator<T> = (set: Function, get: Function) => T;