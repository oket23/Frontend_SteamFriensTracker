import { useEffect, useMemo, useState } from "react";
import type { IFriendSummary } from "@/types/IFriend";
import { useFriendsStore } from "@/store/useFriendsStore";
import useDebounce from "@/hooks/useDebounce/useDebounce";
import { useFriendsQuery } from "@/screens/friends/hooks/useFriendsQuery";

const PAGE_SIZE = 9;

export const useFriendsList = () => {
    const { nameFilter, gameFilter, onlyOnline, onlyInGame } = useFriendsStore();

    const debouncedName = useDebounce(nameFilter, 300);
    const debouncedGame = useDebounce(gameFilter, 300);

    const hasActiveFilters =
        !!nameFilter || !!gameFilter || onlyOnline || onlyInGame;

    const { data, isLoading, isError } = useFriendsQuery();
    const friends = data?.friends ?? [];

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedName, debouncedGame, onlyOnline, onlyInGame]);

    const filteredItems = useMemo(() => {
        const filtered = friends.filter((friend: IFriendSummary) => {
            if (
                debouncedName &&
                !friend.personaName.toLowerCase().includes(debouncedName.toLowerCase())
            ) {
                return false;
            }

            if (debouncedGame) {
                if (
                    !friend.currentGameName ||
                    !friend.currentGameName.toLowerCase().includes(debouncedGame.toLowerCase())
                ) {
                    return false;
                }
            }

            if (onlyOnline && !friend.isOnline) {
                return false;
            }

            if (onlyInGame && !friend.currentGameId) {
                return false;
            }

            return true;
        });

        return filtered.sort((a, b) => {
            const aInGame = !!a.currentGameId;
            const bInGame = !!b.currentGameId;

            if (aInGame !== bInGame) {
                return aInGame ? -1 : 1;
            }

            if (a.isOnline !== b.isOnline) {
                return a.isOnline ? -1 : 1;
            }

            return a.personaName
                .toLowerCase()
                .localeCompare(b.personaName.toLowerCase());
        });
    }, [friends, debouncedName, debouncedGame, onlyOnline, onlyInGame]);

    const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        return filteredItems.slice(startIndex, startIndex + PAGE_SIZE);
    }, [filteredItems, currentPage]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return {isLoading, isError, hasActiveFilters, filteredItems, paginatedItems, currentPage, totalPages, setCurrentPage,};
};
