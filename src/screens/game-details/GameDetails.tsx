import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import mapI18nToSteamLang from "@/helpers/mapI18nToSteamLang";
import { useGameQuery } from "@/screens/game-details/hooks/useGameQuery";
import type { SteamGameDetails } from "@/types/IGameDetails";
import renderPlatforms from "@/screens/game-details/helpers/renderPlatforms.ts";
import GameDetailsNotFound from "@/screens/game-details/components/GameDetailsNotFound";
import HeaderElement from "@/screens/game-details/components/HeaderElement.tsx";
import GameScreenshots from "@/screens/game-details/components/GameScreenshots.tsx";

const GameDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const steamLang = mapI18nToSteamLang(i18n.language);

    const { data, isLoading, isError } = useGameQuery(id!, steamLang);

    if (isLoading) {
        return (
            <div className="bg-slate-950">
                <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-4">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
                        <p className="text-xs text-slate-400">
                            {t("gameDetails.loading")}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!id || !data) {
        return (
            <div className="bg-slate-950">
                <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-4">
                    <GameDetailsNotFound />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-slate-950">
                <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-4">
                    <div className="rounded-2xl border border-rose-800/60 bg-rose-950/40 px-6 py-4 text-center text-xs text-rose-100">
                        <p className="font-semibold">
                            {t("gameDetails.loadErrorTitle")}
                        </p>
                        <p className="mt-1 text-[11px] text-rose-200/80">
                            {t("gameDetails.loadErrorDescription")}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const game: SteamGameDetails = data;

    const genres = game.genres ?? [];
    const developers = game.developers ?? [];
    const publishers = game.publishers ?? [];
    const screenshots = game.screenshots ?? [];
    const platforms = game.platforms ?? {
        windows: false,
        mac: false,
        linux: false,
    };

    const pcReq = game.pc_requirements ?? {};
    const macReq = game.mac_requirements ?? {};
    const linuxReq = game.linux_requirements ?? {};

    const hasMacReq = Boolean(macReq.minimum);
    const hasLinuxReq = Boolean(linuxReq.minimum);
    const hasLanguages = Boolean(
        game.supported_languages && game.supported_languages.trim().length > 0,
    );

    const requiredAge =
        game.required_age === 0 || game.required_age == null
            ? t("gameDetails.ageNoLimit")
            : `${game.required_age}+`;

    const releaseDate = game.release_date?.date ?? "—";

    return (
        <div className="relative bg-slate-950 text-slate-100">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {game.background && (
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: `url(${game.background})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(12px)",
                        }}
                    />
                )}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.9)_0,_#020617_55%)]" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col px-4 py-8 sm:py-10">
                <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-slate-950/80 p-4 shadow-xl shadow-black/40 backdrop-blur-xl sm:flex-row sm:p-6">
                    <div className="flex-shrink-0">
                        <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900">
                            {game.header_image ? (
                                <img
                                    src={game.header_image}
                                    alt={game.name}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="flex h-40 w-64 items-center justify-center text-xs text-slate-500">
                                    {t("gameDetails.noHeaderImage")}
                                </div>

                            )}
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-3">
                        <div>
                            <h1 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                                {game.name}
                            </h1>
                            <p className="mt-1 text-xs text-slate-400">
                                {t("gamesPage.appId")}{" "}
                                <span className="font-mono font-semibold text-sky-300">
                                    {game.steam_appid}
                                </span>
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-[11px] text-slate-200">
                            {game.is_free && (
                                <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-semibold text-emerald-300 ring-1 ring-emerald-500/40">
                                    {t("gameDetails.freeToPlay")}
                                </span>
                            )}

                            {genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-0.5 text-[11px] text-slate-200 ring-1 ring-slate-700/70"
                                >
                                    {genre.description}
                                </span>
                            ))}
                        </div>

                        <div className="mt-1 grid grid-cols-1 gap-2 text-[11px] text-slate-300 sm:grid-cols-2 lg:grid-cols-3">
                            <HeaderElement
                                title={t("gameDetails.labels.release")}
                                value={releaseDate}
                            />
                            <HeaderElement
                                title={t("gameDetails.labels.developer")}
                                value={
                                    developers.length > 0
                                        ? developers.join(", ")
                                        : "—"
                                }
                            />
                            <HeaderElement
                                title={t("gameDetails.labels.publisher")}
                                value={
                                    publishers.length > 0
                                        ? publishers.join(", ")
                                        : "—"
                                }
                            />
                            <HeaderElement
                                title={t("gameDetails.labels.platforms")}
                                value={renderPlatforms(platforms)}
                            />
                            <HeaderElement
                                title={t("gameDetails.labels.age")}
                                value={requiredAge}
                            />

                            {game.website && (
                                <p className="max-w-full sm:max-w-xs">
                                    <span className="text-slate-400">
                                        {t("gameDetails.labels.website")}&nbsp;
                                    </span>
                                    <a
                                        href={game.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-semibold text-sky-300 hover:underline break-all"
                                    >
                                        {game.website}
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                    <div className="space-y-6">
                        {game.short_description && (
                            <section className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 sm:p-5">
                                <h2 className="text-sm font-semibold text-slate-100">
                                    {t("gameDetails.sections.description")}
                                </h2>
                                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                                    {game.short_description}
                                </p>
                            </section>
                        )}

                        {game.detailed_description && (
                            <section className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 sm:p-5">
                                <h2 className="text-sm font-semibold text-slate-100">
                                    {t("gameDetails.sections.details")}
                                </h2>
                                <div
                                    className="prose prose-invert prose-xs mt-2 max-w-none text-slate-200 prose-a:text-sky-300 prose-ul:list-disc prose-li:marker:text-slate-500"
                                    dangerouslySetInnerHTML={{
                                        __html: game.detailed_description,
                                    }}
                                />
                            </section>
                        )}

                        {screenshots.length > 0 && (
                            <GameScreenshots
                                gameName={game.name}
                                screenshots={screenshots}
                            />
                        )}
                    </div>

                    <aside className="space-y-4">
                        <section className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 sm:p-5">
                            <h2 className="text-sm font-semibold text-slate-100">
                                {t("gameDetails.labels.pcRequirements")}
                            </h2>

                            {pcReq.minimum ? (
                                <div
                                    className="mt-2 text-[11px] leading-relaxed text-slate-300"
                                    dangerouslySetInnerHTML={{
                                        __html: pcReq.minimum,
                                    }}
                                />
                            ) : (
                                <p className="mt-2 text-xs text-slate-500">
                                    {t("gameDetails.minRequirementsMissing")}
                                </p>
                            )}
                        </section>
                        {(hasMacReq) && (
                            <section className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 sm:p-5">
                                {hasMacReq && (
                                    <div>
                                        <h3 className="text-[11px] font-semibold text-slate-100 uppercase tracking-wide">
                                            {t("gameDetails.labels.macRequirements")}
                                        </h3>
                                        <div
                                            className="mt-1 text-[11px] leading-relaxed text-slate-300"
                                            dangerouslySetInnerHTML={{
                                                __html: macReq.minimum!,
                                            }}
                                        />
                                    </div>
                                )}
                            </section>
                        )}
                        {(hasLinuxReq) && (
                            <section className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 sm:p-5">


                                {hasLinuxReq && (
                                    <div>
                                        <h3 className="text-[11px] font-semibold text-slate-100 uppercase tracking-wide">
                                            {t("gameDetails.labels.linuxRequirements")}
                                        </h3>
                                        <div
                                            className="mt-1 text-[11px] leading-relaxed text-slate-300"
                                            dangerouslySetInnerHTML={{
                                                __html: linuxReq.minimum!,
                                            }}
                                        />
                                    </div>
                                )}
                            </section>
                        )}

                        {hasLanguages && (
                            <section className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 sm:p-5">
                                <h2 className="text-sm font-semibold text-slate-100">
                                    {t("gameDetails.labels.supportedLanguages")}
                                </h2>
                                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: game.supported_languages!,
                                        }}
                                    />
                                </p>
                            </section>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
