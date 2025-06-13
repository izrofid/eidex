import { create } from "zustand";
import { FilterOptions, MoveSource, SortBy } from "@/types";
import { ComboBoxEntry } from "@/components/Filter/FilterComponents/GenericComboBox";
import { typeDataArray } from "@/utils/typeInfo";

// Helper function to determine the next state in the cycle
const getNextCycleState = (state: boolean | undefined): boolean | undefined => {
  if (state === undefined) return true;    // undefined -> true
  else if (state === true) return false;   // true -> false
  else return undefined;                   // false -> undefined
};

interface FilterState {
  // Core filter values
  filters: FilterOptions;

  // Stat filter specific state
  chosenStat: number | undefined;
  statType: string | undefined;
  isStatMax: boolean;

  // Move filter state
  moveSource: MoveSource;
  moveValues: ComboBoxEntry[];

  // Special Filters
  megaCycle: boolean | undefined;
  nfeCycle: boolean | undefined;
  cycleMega: () => void;
  cycleNfe: () => void;


  // Type
  typeValue: [number?, number?];
  typeOptions: { typeID: number | undefined; typeName: string }[];

  //Ability filter
  abilityValue: ComboBoxEntry | null;

  // Sort state
  sortBy: SortBy;
  sortStat: string | undefined;
  descending: boolean;

  // Name filter
  nameValue: string;

  // Filter toggles state
  filterToggles: [boolean, boolean, boolean]; // [Evolved, Legend, Mega]
  toggleState: "Include" | "Only";

  // Actions
  setChosenStat: (stat: number | undefined) => void;
  setStatType: (type: string | undefined) => void;
  toggleStatMax: () => void;
  setMoveSource: (source: MoveSource) => void;
  setMoveValue: (value: ComboBoxEntry | null) => void;
  removeMoveValue: (value: ComboBoxEntry | null) => void;
  setTypeValue: (typeId: number | undefined) => void;
  getSelectedType: () => { typeID: number | undefined; typeName: string };
  setAbilityValue: (ability: ComboBoxEntry | null) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortStat: (stat: string | undefined) => void;
  toggleSortDirection: () => void;
  setSortDirection: (direction: boolean) => void;
  setNameValue: (name: string) => void;
  setFilterToggle: (idx: number, value: boolean) => void;
  setToggleState: (toggleState: "Include" | "Only") => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  // Initial state
  typeValue: [undefined, undefined] as [number?, number?],
  filters: {
    name: "",
    typeIds: undefined,
    chosenStat: undefined,
    statType: undefined,
    isStatMax: false,
    sortBy: "dexId",
    sortStat: undefined,
    descending: false,
    moveSource: "all",
    moveIds: [] as number[],
    moveNames: [] as string[],
    megaCycle: undefined,
    nfeCycle: undefined,
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
  moveValues: [] as ComboBoxEntry[],
  megaCycle: undefined,
  nfeCycle: undefined,
  abilityValue: null,
  sortBy: "dexId",
  sortStat: undefined,
  descending: false,
  nameValue: "",
  filterToggles: [false, false, false] as [boolean, boolean, boolean], // [Evolved, Legend, Mega]
  toggleState: "Include" as "Include" | "Only",

  // Actions
  setChosenStat: (stat) =>
    set((state) => {
      const chosenStat = stat === 0 ? undefined : stat;
      return {
        chosenStat,
        filters: { ...state.filters, chosenStat },
      };
    }),

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
    set((state) => {
      // If value is null, remove all moves
      if (!value) {
        return {
          moveValues: [],
          filters: {
            ...state.filters,
            moveIds: [],
            moveNames: [],
          },
        };
      }



      // Don't add if we already have 4 moves or if the move is already in the list
      const currentMoves = state.moveValues || [];
      if (currentMoves.length >= 4 || currentMoves.some(move => move.id === value.id)) {
        return state;
      }

      const newMoves = [...currentMoves, value];
      return {
        moveValues: newMoves,
        filters: {
          ...state.filters,
          moveIds: newMoves.map(move => move.id),
          moveNames: newMoves.map(move => move.name),
        },
      };
    }),

    removeMoveValue: (value) =>
    set((state) => {
      // If value is null, remove all moves
      if (!value) {
      return {
        moveValues: [],
        filters: {
        ...state.filters,
        moveIds: [],
        moveNames: [],
        },
      };
      }

      // Remove the given value from the moveValues if it exists
      const currentMoves = state.moveValues || [];
      const newMoves = currentMoves.filter(move => move.id !== value.id);

      return {
      moveValues: newMoves,
      filters: {
        ...state.filters,
        moveIds: newMoves.map(move => move.id),
        moveNames: newMoves.map(move => move.name),
      },
      };
    }),

    setTypeValue: (id?: number) =>
    set((state) => {
      // start with only the defined selections
      if (!state.typeValue) {
        state.typeValue = [undefined, undefined];
      }
      let selected = state.typeValue.filter(
        (t): t is number => t !== undefined,
      );

      if (!id) {
        // “All” clicked → clear
        selected = [];
      } else if (selected.includes(id)) {
        // toggle off
        selected = selected.filter((x) => x !== id);
      } else if (selected.length >= 2) {
        // already two → reset to new
        selected = [id];
      } else {
        // under two → add
        selected.push(id);
      }

      // back to a fixed 2-tuple
      const next: [number?, number?] = [selected[0], selected[1]];

      return {
        typeValue: next,
        filters: { ...state.filters, typeIds: next },
      };
    }),

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

  setSortDirection: (direction) =>
    set((state) => ({
      descending: direction,
      filters: { ...state.filters, descending: direction },
    })),

  setNameValue: (name) =>
    set((state) => ({
      nameValue: name,
      filters: { ...state.filters, name },
    })),

  setFilterToggle: (idx, value) =>
    set((state) => {
      const next: [boolean, boolean, boolean] = [...state.filterToggles] as [
        boolean,
        boolean,
        boolean,
      ];
      next[idx] = value;
      return {
        filterToggles: next,
      };
    }),

  setToggleState: (toggleState) =>
    set(() => ({
      toggleState,
    })),

    
  cycleMega: () =>
    set((state) => {
      const nextState = getNextCycleState(state.megaCycle);
      return {
        megaCycle: nextState,
        filters: { ...state.filters, megaCycle: nextState },
      };
    }),
    
  cycleNfe: () =>
    set((state) => {
      const nextState = getNextCycleState(state.nfeCycle);
      return {
        nfeCycle: nextState,
        filters: { ...state.filters, nfeCycle: nextState },
      };
    }),

  resetFilters: () =>
    set({
      filters: {
        name: "",
        typeIds: undefined,
        chosenStat: undefined,
        statType: undefined,
        isStatMax: false,
        sortBy: "dexId",
        sortStat: undefined,
        descending: false,
        moveSource: "all",
        moveIds: [],
        moveNames: [],
        megaCycle: undefined,
        nfeCycle: undefined,
      },
      chosenStat: undefined,
      statType: undefined,
      isStatMax: false,
      moveSource: "all",
      moveValues: [],
      megaCycle: undefined,
      nfeCycle: undefined,
      typeValue: [undefined, undefined] as [number?, number?],
      abilityValue: null,
      nameValue: "",
      filterToggles: [false, false, false] as [boolean, boolean, boolean],
      toggleState: "Include" as "Include" | "Only",
    }),

  // Selector function for getting selected type
  getSelectedType: () => {
    const state = get();
    return (
      state.typeOptions.find((t) => state.typeValue.includes(t.typeID)) ||
      state.typeOptions[0]
    );
  },
}));
