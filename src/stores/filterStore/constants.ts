import { FilterOptions } from "@/types";
import { SortBy } from "src/stores/filterStore/types.ts";

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
  statValue: undefined,
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
  ability: undefined,
};

// Sort Options
export const statType = {
  HP: "HP",
  ATK: "ATK",
  DEF: "DEF",
  SPA: "SPA",
  SPD: "SPD",
  SPE: "SPE",
  BST: "BST",
} as const;

export type StatType = keyof typeof statType

export const sortOptions: {
  label: string;
  value: SortBy;
  statType?: keyof typeof statType;
  defaultDescending: boolean;
}[] = [
  { label: "Dex #", value: "dexId", defaultDescending: false },
  { label: "Name", value: "name", defaultDescending: false },
  {
    label: "HP",
    value: "stat",
    statType: statType.HP,
    defaultDescending: true,
  },
  {
    label: "Atk",
    value: "stat",
    statType: statType.ATK,
    defaultDescending: true,
  },
  {
    label: "Def",
    value: "stat",
    statType: statType.DEF,
    defaultDescending: true,
  },
  {
    label: "SpA",
    value: "stat",
    statType: statType.SPA,
    defaultDescending: true,
  },
  {
    label: "SpD",
    value: "stat",
    statType: statType.SPD,
    defaultDescending: true,
  },
  {
    label: "Spe",
    value: "stat",
    statType: statType.SPE,
    defaultDescending: true,
  },
  {
    label: "BST",
    value: "stat",
    statType: statType.BST,
    defaultDescending: true,
  },
];
