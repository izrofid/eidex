import { FilterType, CreateFilterPillParams, FilterPill } from "../types/types";

export function createFilterPill<T extends FilterType>({
  id,
  type,
  label,
  value,
}: CreateFilterPillParams<T>): FilterPill<T> {
  return {
    id,
    type,
    label,
    value,
  };
}