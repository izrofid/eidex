import { MoveSource, SortBy } from "@/types";
import { FILTER_TYPES } from "./constants";

export type FilterType = (typeof FILTER_TYPES)[keyof typeof FILTER_TYPES];

// More specific value type definitions
export type NameFilterValue = string;
export type TypeFilterValue = number;
export type AbilityFilterValue = { id: number; name: string };
export type StatFilterValue = { stat: number | undefined; type: string | undefined; isMax: boolean };
export type ItemFilterValue = number;
export type MoveFilterValue = { id: number; name: string; source: MoveSource };
export type SortFilterValue = { by: SortBy; stat: string | undefined; sortDescending: boolean };

// Union type for all possible filter value types
export type FilterPillValue =
  | NameFilterValue
  | TypeFilterValue
  | AbilityFilterValue
  | StatFilterValue
  | ItemFilterValue
  | MoveFilterValue
  | SortFilterValue;

// Type mapping to ensure type safety between filter types and their values
export type FilterValueMap = {
  [FILTER_TYPES.NAME]: NameFilterValue;
  [FILTER_TYPES.TYPE]: TypeFilterValue;
  [FILTER_TYPES.ABILITY]: AbilityFilterValue;
  [FILTER_TYPES.STAT]: StatFilterValue;
  [FILTER_TYPES.ITEM]: ItemFilterValue;
  [FILTER_TYPES.MOVE]: MoveFilterValue;
  [FILTER_TYPES.SORT]: SortFilterValue;
};

export type CreateFilterPillParams<T extends FilterType> = {
  id: string;
  type: T;
  label: string;
  value: FilterValueMap[T];
};

export type FilterPill<T extends FilterType = FilterType> = {
  id: string;
  type: T;
  label: string;
  value: FilterValueMap[T];
};