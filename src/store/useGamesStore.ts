import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GamesState {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    clearSearch: () => void;
}

export const useGamesStore = create<GamesState>()(
    persist(
        (set) => ({
            searchTerm: "",
            setSearchTerm: (term) => set({ searchTerm: term }),
            clearSearch: () => set({ searchTerm: "" }),
        }),
        {
            name: "games-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);