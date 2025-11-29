import { useTranslation } from "react-i18next";
import Pagination from "@/ui/Pagination";
import FriendCard from "@/screens/friends/components/FriendCard";
import FriendsFilters from "@/screens/friends/components/FriendsFilters";
import FriendsLoadingGrid from "@/screens/friends/components/FriendsLoadingGrid";
import { useFriendsList } from "@/screens/friends/hooks/useFriendsList";
import FriendsEmptyState from "@/screens/friends/components/FriendsEmptyStateProps.tsx";

const Friends = () => {
    const { t } = useTranslation();
    const {isLoading, isError, hasActiveFilters, filteredItems, paginatedItems, currentPage, totalPages, setCurrentPage,} = useFriendsList();

    return (
        <div className="bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 min-h-screen">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
                <div className="mx-auto max-w-3xl space-y-4 text-center mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl lg:text-4xl">
                        {t("friendsPage.title")}
                    </h1>
                    <p className="mx-auto max-w-xl text-xs leading-relaxed text-slate-300/85 sm:text-sm">
                        {t("friendsPage.subtitle")}
                    </p>
                </div>

                <FriendsFilters hasActiveFilters={hasActiveFilters} />

                <div className="mx-auto max-w-6xl">
                    {isLoading && <FriendsLoadingGrid />}

                    {!isLoading && isError && (
                        <div className="mt-4 rounded-3xl border border-rose-800/60 bg-rose-950/40 px-4 py-3 text-center text-xs text-rose-100">
                            {t("friendsPage.error")}
                        </div>
                    )}

                    {!isLoading && !isError && filteredItems.length === 0 && (
                        <FriendsEmptyState hasActiveFilters={hasActiveFilters} />
                    )}

                    {!isLoading && !isError && filteredItems.length > 0 && (
                        <>
                            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {paginatedItems.map((friend) => (
                                    <FriendCard key={friend.steamId} friend={friend} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Friends;
