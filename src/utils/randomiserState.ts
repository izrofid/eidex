import { useRandomiserStore } from '@/stores/randomiserStore';
import { useMemo } from 'react';

export type RandomiserState = {
  isActive: boolean;
  trainerId: number;
};

export function useRandomiserState(): RandomiserState {
  const isActive = useRandomiserStore(state => state.isRandomiserActive);
  const trainerId = useRandomiserStore(state => state.trainerIdInfo?.fullId ?? 0);
  
  return useMemo(() => ({
    isActive,
    trainerId
  }), [isActive, trainerId]);
}


export function getRandomiserState(): RandomiserState {
  const state = useRandomiserStore.getState();
  return {
    isActive: state.isRandomiserActive,
    trainerId: state.trainerIdInfo?.fullId ?? 0
  };
}
