export interface IAuthUser {
    id: string;
    nickname: string;
    avatarUrl: string;
}

export interface IRefresh {
    accessToken: string;
    refreshToken: string;
}

export interface IUser {
    steamId: string;
    personaName: string;
    avatarUrl: string;
    profileUrl: string;
    createdAtUtc: string;
    isOnline: boolean;
    personaState: SteamPersonaState;
    currentGameId: string | null;
    currentGameName: string | null;
    lastSeenAtUtc: string | null;
    steamAccountCreatedAtUtc: string | null;
    countryCode: string | null;
}

export type SteamPersonaState =
    | "Offline"
    | "Online"
    | "Busy"
    | "Away"
    | "Snooze"
    | "LookingToTrade"
    | "LookingToPlay";