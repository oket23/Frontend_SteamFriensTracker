import { useTranslation } from "react-i18next";
import { cn } from "@/helpers/cn";
import { useFriendsStore } from "@/store/useFriendsStore";

interface FriendsFiltersProps {
    hasActiveFilters: boolean;
}

const FriendsFilters = ({ hasActiveFilters }: FriendsFiltersProps) => {
    const { t } = useTranslation();

    const {nameFilter, gameFilter, onlyOnline, onlyInGame, setNameFilter, setGameFilter, toggleOnlyOnline, toggleOnlyInGame, resetFilters,} = useFriendsStore();

    return (
        <div className="mx-auto mb-10 max-w-4xl rounded-2xl border border-slate-800 bg-slate-950/50 p-4 shadow-xl backdrop-blur-sm">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 ml-1">
                        {t("friendsPage.nicknameLabel", { defaultValue: "Nickname" })}
                    </label>
                    <input
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        placeholder={t("friendsPage.searchByName")}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 ml-1">
                        {t("friendsPage.gameLabel", { defaultValue: "Game" })}
                    </label>
                    <input
                        type="text"
                        value={gameFilter}
                        onChange={(e) => setGameFilter(e.target.value)}
                        placeholder={t("friendsPage.filterByGame")}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                </div>

                <div className="flex items-end">
                    <button
                        onClick={toggleOnlyOnline}
                        className={cn(
                            "flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200",
                            onlyOnline
                                ? "border-sky-500/50 bg-sky-500/10 text-sky-400"
                                : "border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800"
                        )}
                    >
                        <span
                            className={cn(
                                "h-2 w-2 rounded-full",
                                onlyOnline ? "bg-sky-400" : "bg-slate-600"
                            )}
                        />
                        {t("friendsPage.onlyOnline")}
                    </button>
                </div>

                <div className="flex items-end">
                    <button
                        onClick={toggleOnlyInGame}
                        className={cn(
                            "flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200",
                            onlyInGame
                                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                                : "border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800"
                        )}
                    >
                        <span
                            className={cn(
                                "h-2 w-2 rounded-full",
                                onlyInGame ? "bg-emerald-400" : "bg-slate-600"
                            )}
                        />
                        {t("friendsPage.onlyInGame")}
                    </button>
                </div>
            </div>

            {hasActiveFilters && (
                <div className="mt-4 flex justify-end border-t border-slate-800/50 pt-3">
                    <button
                        onClick={resetFilters}
                        className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {t("friendsPage.clearFilters")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FriendsFilters;
