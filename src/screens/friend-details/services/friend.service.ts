import instance from "@/services/api/interceptors.api";
import type {IApiResponse} from "@/types/api-response.ts";
import {getFriendDetailsUrl} from "@/config/api.config.ts";
import type {IUser} from "@/types/IAuth.ts";

export const FriendService = {
    get: async(id: string) =>
        instance<IApiResponse<IUser>>({
            url: getFriendDetailsUrl(id),
            method: "GET",
        })
}