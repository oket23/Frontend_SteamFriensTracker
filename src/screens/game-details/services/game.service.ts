import type {IApiResponse} from "@/types/api-response.ts";
import instance from "@/services/api/interceptors.api.ts";
import {getGameDetailsUrl} from "@/config/api.config.ts";
import type {SteamGameDetails} from "@/types/IGameDetails.ts";

export const GameService = {
    get: async (id: string,lang: string) =>
        instance<IApiResponse<SteamGameDetails>>({
            url: getGameDetailsUrl(id,lang),
            method: "GET",
        })

}