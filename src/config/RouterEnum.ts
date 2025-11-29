export const RouterEnum = {
    MAIN: '/',
    AUTH_CALLBACK: "/auth/callback",
    PROFILE: '/profile',
    GAMES: "/games",
    GAME_DETAILS: "/games/:id",
    FRIENDS: "/friends",
    FRIENDS_DETAILS: "/friends/:id",
}

export type RouterEnum = typeof RouterEnum[keyof typeof RouterEnum]