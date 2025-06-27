import { 
  FilterPillValue, 
  NameFilterValue, 
  TypeFilterValue,
  AbilityFilterValue,
  StatFilterValue,
  ItemFilterValue,
  MoveFilterValue,
  SortFilterValue
} from "./types";

// Type guard functions to check value types
export function isNameFilterValue(value: FilterPillValue): value is NameFilterValue {
  return typeof value === 'string';
}

export function isTypeFilterValue(value: FilterPillValue): value is TypeFilterValue {
  return typeof value === 'number';
}

export function isAbilityFilterValue(value: FilterPillValue): value is AbilityFilterValue {
  return typeof value === 'object' && 'id' in value && 'name' in value 
    && !('source' in value) && !('stat' in value) && !('by' in value);
}

export function isStatFilterValue(value: FilterPillValue): value is StatFilterValue {
  return typeof value === 'object' && 'stat' in value && 'isMax' in value;
}

export function isItemFilterValue(value: FilterPillValue): value is ItemFilterValue {
  return typeof value === 'number';  // Fixed to match your type definition
}

export function isMoveFilterValue(value: FilterPillValue): value is MoveFilterValue {
  return typeof value === 'object' && 'id' in value && 'source' in value;
}

export function isSortFilterValue(value: FilterPillValue): value is SortFilterValue {
  return typeof value === 'object' && 'by' in value && 'sortDescending' in value;
}