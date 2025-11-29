export interface SteamRequirements {
    minimum?: string | null;
    recommended?: string | null;
}

export interface SteamPlatforms {
    windows: boolean;
    mac: boolean;
    linux: boolean;
}

export interface SteamCategory {
    id: number;
    description: string;
}

export interface SteamGenre {
    id: string;
    description: string;
}

export interface SteamScreenshot {
    id: number;
    path_thumbnail: string;
    path_full: string;
}

export interface SteamMovie {
    id: number;
    name: string;
    thumbnail: string;
    webm: string | null;
    mp4: string | null;
    dash_av1: string | null;
    dash_h264: string | null;
    hls_h264: string | null;
    highlight: boolean;
}

export interface SteamReleaseDate {
    coming_soon: boolean;
    date: string;
}

export interface SteamGameDetails {
    type?: string | null;
    name: string;
    steam_appid: number;

    required_age?: number | null;
    is_free?: boolean | null;

    detailed_description?: string | null;
    about_the_game?: string | null;
    short_description?: string | null;
    supported_languages?: string | null;

    header_image?: string | null;
    capsule_image?: string | null;
    capsule_imagev5?: string | null;
    website?: string | null;

    pc_requirements?: SteamRequirements | null;
    mac_requirements?: SteamRequirements | null;
    linux_requirements?: SteamRequirements | null;

    developers?: string[] | null;
    publishers?: string[] | null;

    platforms?: SteamPlatforms | null;
    categories?: SteamCategory[] | null;
    genres?: SteamGenre[] | null;

    screenshots?: SteamScreenshot[] | null;
    movies?: SteamMovie[] | null;

    release_date?: SteamReleaseDate | null;

    background?: string | null;
    background_raw?: string | null;
}
