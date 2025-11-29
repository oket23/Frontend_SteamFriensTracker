import type {IUser} from "@/types/IAuth.ts";
import {useQuery} from "@tanstack/react-query";
import type {IApiResponse} from "@/types/api-response.ts";
import {FriendService} from "@/screens/friend-details/services/friend.service.ts";

export const useFriendQuery = (id: string) => {
    return useQuery<IUser>({
        queryKey:["friend.details", id],
        enabled: !!id,
        queryFn: async () =>{
            const res = await FriendService.get(id);
            const body: IApiResponse<IUser> = res.data;

            if (!body.success) {
                throw new Error(
                    body.error || body.message || `Failed to load friend ${id} from API`
                );
            }

            return body.data;
        }
    })
}