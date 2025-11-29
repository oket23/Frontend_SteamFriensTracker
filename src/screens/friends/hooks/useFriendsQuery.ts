import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from "@microsoft/signalr";
import { FriendsService } from "../services/friends.service";
import type { IFriendsSnapshot } from "@/types/IFriend";
import { useAuthStore } from "@/store/useAuthStore";
import type { IApiResponse } from "@/types/api-response";
import {getConnectWebSocketUrl, SERVER_URL} from "@/config/api.config";

export const useFriendsQuery = () => {
    const queryClient = useQueryClient();
    const { accessToken } = useAuthStore();
    const connectionRef = useRef<HubConnection | null>(null);

    const query = useQuery({
        queryKey: ["friends"],
        queryFn: async () => {
            const res = await FriendsService.get();
            const body = res.data as IApiResponse<IFriendsSnapshot>;

            if (!body.success) {
                throw new Error(
                    body.error || body.message || "Failed to load friends from API"
                );
            }
            return body.data;
        },
        staleTime: Infinity,
        enabled: !!accessToken,
    });

    useEffect(() => {
        if (!accessToken) return;

        const connection = new HubConnectionBuilder()
            .withUrl(SERVER_URL + getConnectWebSocketUrl(), {
                accessTokenFactory: () => accessToken,
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        connectionRef.current = connection;

        const handleSnapshotUpdate = (snapshot: IFriendsSnapshot) => {
            console.log("SignalR: Snapshot Updated", snapshot);
            queryClient.setQueryData<IFriendsSnapshot>(["friends"], () => {
                return snapshot;
            });
        };

        connection.on("FriendsSnapshotUpdated", handleSnapshotUpdate);

        const startConnection = async () => {
            try {
                if (connection.state === HubConnectionState.Disconnected) {
                    await connection.start();
                    console.log("SignalR Connected");
                }
            } catch (err) {
                console.error("SignalR Connection Error:", err);
            }
        };

        startConnection();

        return () => {
            connection.off("FriendsSnapshotUpdated", handleSnapshotUpdate);
            connection.stop();
        };
    }, [accessToken, queryClient]);

    return query;
};