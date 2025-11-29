import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import type {IFriendSummary} from "@/types/IFriend";
import {cn} from "@/helpers/cn";

interface FriendCardProps {
    friend: IFriendSummary;
}

const FriendCard = ({friend}: FriendCardProps) => {
    const {t} = useTranslation();

    const isInGame = !!friend.currentGameId;
    const isOffline = !friend.isOnline;

    const gameName = friend.currentGameName;
    const appId = friend.currentGameId;
    const hasGame = !!gameName && !!appId;

    const gameDetailsPath = hasGame ? `/games/${appId}` : undefined;

    const formattedLastSeen =
        friend.lastSeenAtUtc && isOffline
            ? new Date(friend.lastSeenAtUtc).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            })
            : null;

    const headerStatusLabel =
        (isInGame && t("friendsPage.labels.inGameCaps")) ||
        friend.personaState?.toUpperCase() ||
        (friend.isOnline
            ? t("friendsPage.labels.onlineCaps")
            : t("friendsPage.labels.offlineCaps"));

    return (
        <article
            className="
                group flex flex-col overflow-hidden
                rounded-2xl border border-slate-800/80
                bg-slate-950/80
                shadow-[0_18px_40px_rgba(15,23,42,0.9)]
                transition-all duration-200
                hover:border-sky-500/70 hover:shadow-sky-900/60
            "
        >
            <div className="relative w-full overflow-hidden bg-slate-900">
                <div
                    className={cn(
                        "h-24",
                        isInGame &&
                        "bg-[radial-gradient(circle_at_0%_0%,rgba(16,185,129,0.45),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(5,150,105,0.4),transparent_55%)]",
                        !isInGame &&
                        friend.isOnline &&
                        "bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.45),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(37,99,235,0.4),transparent_55%)]",
                        !friend.isOnline &&
                        "bg-[radial-gradient(circle_at_0%_0%,rgba(148,163,184,0.35),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(30,41,59,0.7),transparent_55%)]"
                    )}
                />

                <div className="absolute inset-0 px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="relative">
                            <div
                                className={cn(
                                    "absolute inset-0 rounded-2xl blur-xl",
                                    isInGame
                                        ? "bg-emerald-500/25"
                                        : friend.isOnline
                                            ? "bg-sky-500/25"
                                            : "bg-slate-600/25"
                                )}
                            />
                            <div
                                className={cn(
                                    "relative h-14 w-14 overflow-hidden rounded-2xl ring-2 ring-offset-2 ring-offset-slate-950",
                                    friend.isOnline ? "ring-sky-400" : "ring-slate-700",
                                    isInGame && "ring-emerald-400"
                                )}
                            >
                                <img
                                    src={friend.avatarUrl}
                                    alt={friend.personaName}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            </div>

                            <span
                                className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-900/80 bg-slate-950/90"
                                title={
                                    friend.isOnline
                                        ? t("profile.tooltipOnline")
                                        : t("profile.tooltipOffline")
                                }
                            >
                                <span
                                    className={cn(
                                        "h-2.5 w-2.5 rounded-full",
                                        friend.isOnline
                                            ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                                            : "bg-slate-500"
                                    )}
                                />
                            </span>
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-50">
                                {friend.personaName}
                            </p>
                            <p className="mt-0.5 text-[11px] text-slate-200/80">
                                {t("friendsPage.labels.steamId")}{" "}
                                <span className="font-semibold text-slate-50">
                                    {friend.steamId}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <span
                            className={cn(
                                "inline-flex items-center rounded-full px-3 py-0.5 text-[11px] font-semibold tracking-wide uppercase border",
                                isInGame
                                    ? "bg-emerald-500/15 text-emerald-200 border-emerald-400/50"
                                    : friend.isOnline
                                        ? "bg-sky-500/15 text-sky-200 border-sky-400/50"
                                        : "bg-slate-900/70 text-slate-200 border-slate-600/70"
                            )}
                        >
                            {headerStatusLabel}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col px-4 py-3">
                <div className="mt-3 space-y-1 text-xs text-slate-400">
                    {hasGame ? (
                        <p>
                            {t("friendsPage.labels.playing")}{" "}
                            {gameDetailsPath ? (
                                <Link
                                    to={gameDetailsPath}
                                    className="font-semibold text-emerald-300 hover:text-emerald-200 hover:underline transition-colors"
                                >
                                    {gameName}
                                </Link>
                            ) : (
                                <span className="font-semibold text-slate-100">
                                    {gameName}
                                </span>
                            )}
                            <span className="text-slate-500">
                                {" "}
                                · {t("gamesPage.appId")}{" "}
                                <span className="font-semibold text-slate-300">
                                    {appId}
                                </span>
                            </span>
                        </p>
                    ) : (
                        <p className="text-slate-500">
                            {friend.isOnline
                                ? t("friendsPage.labels.notInGame")
                                : t("friendsPage.labels.offline")}
                        </p>
                    )}

                    {formattedLastSeen && (
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-3.5 w-3.5 text-slate-500"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.5a.75.75 0 00-1.5 0v4.25c0 .199.079.39.22.53l2.5 2.5a.75.75 0 101.06-1.06l-2.28-2.28V6.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>
                                {t("friendsPage.labels.lastSeen")}{" "}
                                <span className="font-medium text-slate-300">
                                    {formattedLastSeen}
                                </span>
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                    {friend.profileUrl && (
                        <a
                            href={friend.profileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="
                                inline-flex items-center justify-center rounded-full
                                px-3 py-1.5 text-[11px] font-medium
                                bg-slate-900/90 text-slate-200
                                border border-slate-700/80
                                hover:border-sky-500/70 hover:text-sky-100
                                transition-all duration-200
                            "
                        >
                            {t("friendsPage.buttons.viewProfile")}
                        </a>
                    )}

                    <Link
                        to={`/friends/${friend.steamId}`}
                        className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-sky-600 to-blue-600 text-slate-50 shadow-md shadow-sky-900/40 ring-1 ring-white/10 transition-all duration-200 hover:scale-[1.02] hover:shadow-sky-500/40 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    >
                        {t("friendsPage.details")}
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default FriendCard;
