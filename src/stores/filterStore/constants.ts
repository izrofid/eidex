import { FilterOptions } from "src/stores/filterStore/types.ts";

export const FILTER_CONSTANTS = {
  DEFAULT_NAME: "",
  DEFAULT_ITEM: 0,
  DEFAULT_ABILITY: 0,
  DEFAULT_TYPEVAL: [undefined, undefined] as [number?, number?],
  MAX_MOVES: 4,
  DEFAULT_SORT: "dexId",
  DEFAULT_MOVE_SOURCE: "all",
  TOGGLE_STATES: {
    INCLUDE: "Include",
    ONLY: "Only",
  } as const,
} as const;

export const initialFilters: FilterOptions = {
  name: "",
  typeIds: [undefined, undefined],
  chosenStat: undefined,
  statType: undefined,
  isStatMax: false,
  sortBy: FILTER_CONSTANTS.DEFAULT_SORT,
  sortStat: undefined,
  sortDescending: false,
  moveSource: FILTER_CONSTANTS.DEFAULT_MOVE_SOURCE,
  moveIds: [],
  moveNames: [],
  megaCycle: undefined,
  nfeCycle: undefined,
  heldItem: 0,
  abilityId: undefined,
  ability: undefined
};