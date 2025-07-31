import React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentSearchItem {
  id: number;
  name: string;
  type: 'Pokemon' | 'Ability' | 'Move';
  icon: React.ReactNode;
}

interface RecentSearchesState {
  recentSearches: RecentSearchItem[];
  addRecentSearch: (item: Omit<RecentSearchItem, 'icon'>) => void;
  clearRecentSearches: () => void;
}

export const useRecentSearchesStore = create<RecentSearchesState>()(
  persist(
    (set) => ({
      recentSearches: [],
      
      addRecentSearch: (item) => {
        set((state) => {
          // Remove if already exists
          const filtered = state.recentSearches.filter(
            (search) => !(search.id === item.id && search.type === item.type)
          );
          const newRecentSearch: RecentSearchItem = { ...item, icon: null };
          const newRecentSearches = [newRecentSearch, ...filtered].slice(0, 8);

          return { recentSearches: newRecentSearches };
        });
      },
      
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'recent-searches-storage',
      // Don't persist icons (React nodes)
      partialize: (state) => ({
        recentSearches: state.recentSearches.map(({ icon, ...rest }) => rest)
      }),
    }
  )
);