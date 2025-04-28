export interface Pokemon {
    id: number;
    name: string;
    stats: number[];  // [HP, Attack, Defense, Special Attack, Special Defense, Speed]
    types: number[];  // Type IDs (e.g., [12, 7])
    abilities: number[][];  // Format: [abilityId, flag]
    sprite?: string;  // Base64 encoded image
  }

export interface FilterOptions {
    name?: string;
    typeId?: number;
    minStat?: number;
    statType?: string;
    ability?: string;
  }