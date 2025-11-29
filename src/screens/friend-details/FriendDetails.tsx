import { useParams, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { cn } from "@/helpers/cn";
import formatDate from "@/helpers/formDate.ts";
import stateColor from "@/helpers/stateColor";

import CenterMessage from "@/screens/profile/components/CenterMessage";
import Skeleton from "@/screens/profile/components/Skeleton";
import StatCard from "@/screens/profile/components/StatCard";
import Panel from "@/screens/profile/components/Panel";
import Row from "@/screens/profile/components/Row";

import { useFriendQuery } from "@/screens/friend-details/hooks/useFriendQuery";

const FriendDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    const { data, isLoading, isError } = useFriendQuery(id!);

    const stateLabel = (personaState?: string) =>
        personaState ?? t("profile.stateUnknown");

    if (!id) {
        return (
            <CenterMessage
                title={t("friendDetails.missingIdTitle")}
                desc={t("friendDetails.missingIdDesc")}
            />
        );
    }

    if (isLoading) return <Skeleton />;

    if (isError) {
        return (
            <CenterMessage
                title={t("friendDetails.loadErrorTitle")}
                desc={t("friendDetails.loadErrorDesc")}
            />
        );
    }

    if (!data) {
        return (
            <CenterMessage
                title={t("friendDetails.notLoadedTitle")}
                desc={t("friendDetails.notLoadedDesc")}
            />
        );
    }

    const isOffline = (data.personaState ?? "").toLowerCase() === "offline";

    return (
        <div className={cn("relative min-h-[calc(99.7vh-7rem)] bg-slate-950 text-slate-100")}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
                <div className="absolute -bottom-24 left-1/3 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(800px_500px_at_20%_110%,rgba(52,211,153,0.10),transparent_55%)]" />
            </div>

            <div className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.75)] backdrop-blur-xl">
                    <div className="relative px-6 py-6 sm:px-8">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#182235]/70 via-slate-950/30 to-transparent" />
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/25 to-transparent" />

                        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-sky-500/15 blur-xl" />
                                    <div className="relative h-[88px] w-[88px] overflow-hidden rounded-full ring-2 ring-white/10">
                                        <img
                                            src={data.avatarUrl}
                                            alt={data.personaName}
                                            className="h-full w-full object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>

                                    <span
                                        className={cn(
                                            "absolute -bottom-1 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-slate-950/80"
                                        )}
                                        title={
                                            data.isOnline
                                                ? t("profile.tooltipOnline")
                                                : t("profile.tooltipOffline")
                                        }
                                    >
                                        <span
                                            className={cn(
                                                "h-3 w-3 rounded-full",
                                                data.isOnline
                                                    ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                                                    : "bg-slate-500"
                                            )}
                                        />
                                    </span>
                                </div>

                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h1 className="truncate text-2xl font-extrabold tracking-tight text-white">
                                            {data.personaName}
                                        </h1>

                                        <span
                                            className={cn(
                                                "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                                                stateColor(data.personaState, data.isOnline)
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "h-1.5 w-1.5 rounded-full",
                                                    data.isOnline ? "bg-emerald-300" : "bg-slate-400"
                                                )}
                                            />
                                            {stateLabel(data.personaState)}
                                        </span>
                                    </div>

                                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                                        <span className="truncate">
                                            {t("profile.labels.steamId")}{" "}
                                            <span className="font-semibold text-slate-200">
                                                {data.steamId}
                                            </span>
                                        </span>
                                        {data.countryCode ? (
                                            <span>
                                                {t("profile.labels.country")}{" "}
                                                <span className="font-semibold text-slate-200">
                                                    {data.countryCode}
                                                </span>
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className="mt-2 text-xs text-slate-400">
                                        {data.currentGameName ? (
                                            <>
                                                {t("profile.labels.currentGame")}{" "}
                                                <span className="font-semibold text-slate-100">
                                                    {data.currentGameName}
                                                </span>
                                                {data.currentGameId ? (
                                                    <span className="text-slate-500">
                                                        {" "}
                                                        · {t("profile.labels.appId")}{" "}
                                                        <span className="font-semibold text-slate-300">
                                                            {data.currentGameId}
                                                        </span>
                                                    </span>
                                                ) : null}
                                            </>
                                        ) : (
                                            <span className="text-slate-500">
                                                {isOffline
                                                    ? t("profile.labels.offline")
                                                    : t("profile.labels.notInGame")}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 sm:items-end">
                                <a
                                    href={data.profileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={cn(
                                        "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
                                        "rounded-full px-5 py-2.5 text-sm font-bold text-white",
                                        "bg-gradient-to-r from-sky-600 to-blue-600",
                                        "shadow-lg shadow-sky-900/20 ring-1 ring-white/15",
                                        "transition-all duration-300 hover:shadow-sky-500/35 hover:scale-[1.02] active:scale-[0.98]",
                                        "focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                                    )}
                                >
                                    <span className="absolute inset-0 bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    {t("profile.buttons.viewSteamProfile")}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="px-6 py-5 sm:px-8">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <StatCard
                                label={t("friendDetails.stats.steamCreated", "Steam account created")}
                                value={formatDate(data.steamAccountCreatedAtUtc)}
                            />
                            <StatCard
                                label={t("friendDetails.stats.lastSeen", "Last seen online")}
                                value={formatDate(data.lastSeenAtUtc)}
                            />
                            <StatCard
                                label={t("friendDetails.stats.status", "Status")}
                                value={stateLabel(data.personaState)}
                            />
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <Panel title={t("friendDetails.summary.title", "Summary")}>
                                <div className="space-y-2">

                                    <Row
                                        k={t("profile.summary.online")}
                                        v={
                                            data.isOnline
                                                ? t("profile.summary.onlineYes")
                                                : t("profile.summary.onlineNo")
                                        }
                                    />
                                    <Row
                                        k={t("profile.summary.country")}
                                        v={data.countryCode ?? "—"}
                                    />
                                </div>
                            </Panel>

                            <Panel title={t("profile.activity.title")}>
                                <div className="rounded-2xl border border-white/10 bg-slate-900/25 p-5">
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        {t("profile.activity.nowPlayingHeading")}
                                    </div>

                                    <div className="mt-3 text-base font-semibold text-slate-100">
                                        {data.currentGameId ? (
                                            <Link
                                                to={`/games/${data.currentGameId}`}
                                                className="text-sky-400 transition-colors duration-200 hover:text-sky-300 hover:underline"
                                            >
                                                {data.currentGameName}
                                            </Link>
                                        ) : (
                                            <>
                                                <p className="mb-2">—</p>
                                                <span className="text-sm text-slate-500">
                                                    {t("profile.activity.noSession")}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    <div className="mt-2 text-sm text-slate-400">
                                        {data.currentGameId ? (
                                            <>
                                                {t("profile.labels.appId")}{" "}
                                                <span className="font-semibold text-slate-200">
                                                    {data.currentGameId}
                                                </span>
                                            </>
                                        ) : " "}
                                    </div>

                                    <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendDetails;
