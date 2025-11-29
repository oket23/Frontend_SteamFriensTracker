import instance from "@/services/api/interceptors.api";
import type {IApiResponse} from "@/types/api-response.ts";
import type {IFriendsSnapshot} from "@/types/IFriend.ts";
import {getFriendsUrl} from "@/config/api.config.ts";

export const FriendsService = {
    get: async() =>
        instance<IApiResponse<IFriendsSnapshot>>({
            url: getFriendsUrl(),
            method: "GET",
        })
}