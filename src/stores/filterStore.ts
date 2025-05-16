import { create } from "zustand";
import { FilterOptions, MoveSource, SortBy } from "@/types";
import { ComboBoxEntry } from "@/components/Filter/FilterComponents/GenericComboBox";
import { typeDataArray } from "@/utils/typeInfo";

interface FilterState {
  // Core filter values
  filters: FilterOptions;

  // Stat filter specific state
  chosenStat: number | undefined;
  statType: string | undefined;
  isStatMax: boolean;

  // Move filter state
  moveSource: MoveSource;
  moveValue: ComboBoxEntry | null;

  // Type
  typeValue: number | undefined;
  typeOptions: { typeID: number | undefined; typeName: string }[];

  //Ability filter
  abilityValue: ComboBoxEntry | null;

  // Sort state
  sortBy: SortBy;
  sortStat: string | undefined;
  descending: boolean;

  // Name filter
  nameValue: string;

  // Actions
  setChosenStat: (stat: number | undefined) => void;
  setStatType: (type: string | undefined) => void;
  toggleStatMax: () => void;
  setMoveSource: (source: MoveSource) => void;
  setMoveValue: (value: ComboBoxEntry | null) => void;
  setTypeValue: (typeId: number | undefined) => void;
  getSelectedType: () => { typeID: number | undefined; typeName: string };
  setAbilityValue: (ability: ComboBoxEntry | null) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortStat: (stat: string | undefined) => void;
  toggleSortDirection: () => void;
  setNameValue: (name: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  // Initial state
  filters: {
    name: "",
    typeId: undefined,
    chosenStat: undefined,
    statType: undefined,
    isStatMax: false,
    sortBy: "dexId",
    sortStat: undefined,
    descending: false,
    moveSource: "all",
  },

  // Type options
  typeOptions: [
    { typeID: undefined, typeName: "All" },
    ...typeDataArray.filter(Boolean),
  ],

  // Individual state slices
  chosenStat: undefined,
  statType: undefined,
  isStatMax: false,
  moveSource: "all",
  moveValue: null,
  typeValue: undefined,
  abilityValue: null,
  sortBy: "dexId",
  sortStat: undefined,
  descending: false,
  nameValue: "",

  // Actions
  setChosenStat: (stat) =>
    set((state) => ({
      chosenStat: stat,
      filters: { ...state.filters, chosenStat: stat },
    })),

  setStatType: (type) =>
    set((state) => ({
      statType: type,
      filters: { ...state.filters, statType: type },
    })),

  toggleStatMax: () =>
    set((state) => ({
      isStatMax: !state.isStatMax,
      filters: { ...state.filters, isStatMax: !state.isStatMax },
    })),

  setMoveSource: (source) =>
    set((state) => ({
      moveSource: source,
      filters: { ...state.filters, moveSource: source },
    })),

  setMoveValue: (value) =>
    set((state) => ({
      moveValue: value,
      filters: {
        ...state.filters,
        moveId: value?.id,
        moveName: value?.name,
      },
    })),

  setTypeValue: (typeId) =>
    set((state) => ({
      typeValue: typeId,
      filters: { ...state.filters, typeId },
    })),

  setAbilityValue: (ability) =>
    set((state) => ({
      abilityValue: ability,
      filters: {
        ...state.filters,
        abilityId: ability?.id,
        ability: ability?.name,
      },
    })),

  setSortBy: (sortBy) =>
    set((state) => ({
      sortBy,
      filters: { ...state.filters, sortBy },
    })),

  setSortStat: (stat) =>
    set((state) => ({
      sortStat: stat,
      filters: { ...state.filters, sortStat: stat },
    })),

  toggleSortDirection: () =>
    set((state) => ({
      descending: !state.descending,
      filters: { ...state.filters, descending: !state.descending },
    })),

  setNameValue: (name) =>
    set((state) => ({
      nameValue: name,
      filters: { ...state.filters, name },
    })),

  resetFilters: () =>
    set({
      filters: {
        name: "",
        typeId: undefined,
        chosenStat: undefined,
        statType: undefined,
        isStatMax: false,
        sortBy: "dexId",
        sortStat: undefined,
        descending: false,
        moveSource: "all",
      },
      chosenStat: undefined,
      statType: undefined,
      isStatMax: false,
      moveSource: "all",
      moveValue: null,
      typeValue: undefined,
      abilityValue: null,
      nameValue: "",
    }),

  // Selector function for getting selected type
  getSelectedType: () => {
    const state = get();
    return (
      state.typeOptions.find((t) => t.typeID === state.typeValue) ||
      state.typeOptions[0]
    );
  },
}));
