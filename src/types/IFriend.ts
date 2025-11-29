import type {SteamPersonaState} from "@/types/IAuth.ts";

export interface IFriendSummary {
    steamId: string;
    personaName: string;
    avatarUrl: string;
    profileUrl: string;
    personaState: SteamPersonaState;
    isOnline: boolean;
    currentGameId?: string;
    currentGameName?: string;
    lastSeenAtUtc?: string;
}

export interface IFriendsSnapshot {
    generatedAtUtc: string;
    friends: IFriendSummary[];
}

