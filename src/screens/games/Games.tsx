import {type FormEvent} from "react";
import {Link} from "react-router";
import {useTranslation} from "react-i18next";
import {useGamesQuery} from "@/screens/games/hooks/useGamesQuery";
import formatPrice, {type PriceInfo} from "@/screens/games/helpers/formatPrice.tsx";
import {useGamesStore} from "@/store/useGamesStore";
import mapI18nToSteamLang from "@/helpers/mapI18nToSteamLang";
import GamesNotFound from "@/screens/games/components/games-not-found/GamesNotFound.tsx";
import type {ISteamStoreSearchItem} from "@/types/ISteamSearch.ts";
import useDebounce from "@/hooks/useDebounce/useDebounce.tsx";
import mapI18nToRegion from "@/screens/games/helpers/mapI18nToRegion.tsx";

const Games = () => {
    const {t, i18n} = useTranslation();
    const {searchTerm: searchInput, setSearchTerm: setSearchInput} = useGamesStore();
    const debouncedSearchTerm = useDebounce(searchInput, 500);
    const steamLang = mapI18nToSteamLang(i18n.language);
    const steamRegion = mapI18nToRegion(i18n.language);

    const {data, isLoading, isError} = useGamesQuery({
        name: debouncedSearchTerm,
        lang: steamLang,
        region: steamRegion,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    const items = data?.items ?? [];

    const hasSearch = debouncedSearchTerm.trim().length > 0;

    return (
        <div className="bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
            <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-8 sm:py-10">
                <div className="mx-auto max-w-3xl space-y-4 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl lg:text-4xl">
                        {t("gamesPage.title")}
                    </h1>
                    <p className="mx-auto max-w-xl text-xs leading-relaxed text-slate-300/85 sm:text-sm">
                        {t("gamesPage.subtitle")}
                    </p>
                </div>

                <div className="mx-auto mt-8 max-w-3xl">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3 sm:flex-row sm:items-center"
                    >
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder={t("gamesPage.placeholder")}
                                className="
                                    w-full rounded-full border border-slate-800 bg-slate-950/70
                                    px-4 py-2.5 text-sm text-slate-100
                                    placeholder:text-slate-500
                                    outline-none
                                    focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30
                                "
                            />

                            {isLoading && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <div
                                        className="h-4 w-4 animate-spin rounded-full border-2 border-sky-500 border-t-transparent"/>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="
                                inline-flex items-center justify-center rounded-full
                                px-5 py-2.5 text-sm font-semibold
                                bg-gradient-to-r from-sky-600 to-blue-600
                                text-slate-50 shadow-lg shadow-sky-900/30
                                ring-1 ring-white/10
                                transition-all duration-200
                                hover:scale-[1.02] hover:shadow-sky-500/40
                                active:scale-[0.98]
                                focus:outline-none focus:ring-2 focus:ring-sky-500/40
                            "
                        >
                            {t("gamesPage.searchButton")}
                        </button>
                    </form>
                </div>

                <div className="mx-auto mt-8 max-w-5xl">
                    {!searchInput && (
                        <div className="mt-10 flex justify-center">
                            <div className="text-center max-w-md space-y-1 ">
                                <p className="text-sm font-semibold text-slate-100 mb-2">
                                    Тут поки що нічого немає :(
                                </p>
                                <p className="text-xs text-slate-400">
                                    Почни пошук, ввівши назву гри у поле вище.
                                </p>
                            </div>
                        </div>
                    )}
                    {isLoading && hasSearch && (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {Array.from({length: 6}).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="
                                        animate-pulse
                                        flex flex-col overflow-hidden
                                        rounded-2xl border border-slate-800/80
                                        bg-slate-950/70
                                        shadow-[0_18px_40px_rgba(15,23,42,0.8)]
                                    "
                                >
                                    <div className="h-28 w-full bg-slate-900"/>
                                    <div className="flex-1 px-4 py-3 space-y-3">
                                        <div className="h-3 w-3/4 rounded-full bg-slate-800"/>
                                        <div className="h-3 w-1/2 rounded-full bg-slate-800"/>
                                        <div className="mt-2 flex justify-end">
                                            <div className="h-7 w-20 rounded-full bg-slate-800"/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!isLoading && isError && hasSearch && (
                        <div
                            className="mt-4 rounded-3xl border border-rose-800/60 bg-rose-950/40 px-4 py-3 text-center text-xs text-rose-100">
                            {t("gamesPage.error")}
                        </div>
                    )}

                    {!isLoading && !isError && hasSearch && items.length === 0 && (
                        <div className="mt-4 flex justify-center">
                            <GamesNotFound/>
                        </div>
                    )}

                    {!isLoading && !isError && hasSearch && items.length > 0 && (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {items.map((game: ISteamStoreSearchItem) => {
                                const priceInfo: PriceInfo = formatPrice(game.price);

                                return (
                                    <article
                                        key={game.id}
                                        className="
                                            group flex flex-col overflow-hidden
                                            rounded-2xl border border-slate-800/80
                                            bg-slate-950/70
                                            shadow-[0_18px_40px_rgba(15,23,42,0.8)]
                                            transition-all duration-200
                                            hover:border-sky-500/60 hover:shadow-sky-900/50
                                        "
                                    >
                                        <div className="relative h-28 w-full overflow-hidden bg-slate-900">
                                            <img
                                                src={game.tiny_image}
                                                alt={game.name}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col px-4 py-3">
                                            <h2 className="text-sm font-semibold text-slate-100 line-clamp-2">
                                                {game.name}
                                            </h2>

                                            <div
                                                className="mt-3 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
                                                <span
                                                    className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-200">
                                                    {t("gamesPage.appId")}
                                                    <span className="ml-1 font-semibold text-sky-300">
                                                        {game.id}
                                                    </span>
                                                </span>

                                                <div className="flex items-center gap-2 text-xs">
                                                    {priceInfo.kind === "free" && (
                                                        <span className="font-semibold text-emerald-400">
                                                            {priceInfo.final}
                                                        </span>
                                                    )}

                                                    {priceInfo.kind === "normal" && (
                                                        <span className="font-semibold text-sky-300">
                                                            {priceInfo.final}
                                                        </span>
                                                    )}

                                                    {priceInfo.kind === "discount" && (
                                                        <div className="flex items-center gap-2">
                                                            <span
                                                                className="text-[11px] font-medium text-rose-400 bg-rose-900/40 px-2 py-0.5 rounded-full">
                                                                -{priceInfo.discountPercent}%
                                                            </span>
                                                            <span className="text-[11px] text-slate-400 line-through">
                                                                {priceInfo.initial}
                                                            </span>
                                                            <span className="font-semibold text-sky-300">
                                                                {priceInfo.final}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4 flex justify-end">
                                                <Link
                                                    to={`/games/${game.id}`}
                                                    className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-sky-600 to-blue-600 text-slate-50 shadow-md shadow-sky-900/40 ring-1 ring-white/10 transition-all duration-200 hover:scale-[1.02] hover:shadow-sky-500/40 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                                                >
                                                    {t("gamesPage.details")}
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Games;