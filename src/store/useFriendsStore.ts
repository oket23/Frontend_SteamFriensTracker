import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FriendsFiltersState {
    nameFilter: string;
    gameFilter: string;
    onlyOnline: boolean;
    onlyInGame: boolean;

    setNameFilter: (name: string) => void;
    setGameFilter: (game: string) => void;
    toggleOnlyOnline: () => void;
    toggleOnlyInGame: () => void;
    resetFilters: () => void;
}

export const useFriendsStore = create<FriendsFiltersState>()(
    persist(
        (set) => ({
            nameFilter: '',
            gameFilter: '',
            onlyOnline: false,
            onlyInGame: false,

            setNameFilter: (name) => set({ nameFilter: name }),
            setGameFilter: (game) => set({ gameFilter: game }),
            toggleOnlyOnline: () => set((state) => ({ onlyOnline: !state.onlyOnline })),
            toggleOnlyInGame: () => set((state) => ({ onlyInGame: !state.onlyInGame })),

            resetFilters: () => set({
                nameFilter: '',
                gameFilter: '',
                onlyOnline: false,
                onlyInGame: false
            }),
        }),
        {
            name: 'friends-filters-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);