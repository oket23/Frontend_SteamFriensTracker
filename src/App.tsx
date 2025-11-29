import {Route, type RouteObject, Routes} from "react-router";
import {RouterEnum} from "@/config/RouterEnum.ts";
import Main from "@/screens/main/Main.tsx";
import Providers from "@/providers/Providers.tsx";
import NotFound from "@/screens/not-found/NotFound.tsx";
import AuthCallback from "@/screens/auth/AuthCallback.tsx";
import Layout from "@components/layout/Layout.tsx";
import Profile from "@/screens/profile/Profile.tsx";
import GameDetails from "@/screens/game-details/GameDetails.tsx";
import Games from "@/screens/games/Games.tsx";
import Friends from "@/screens/friends/Friends.tsx";
import FriendDetails from "@/screens/friend-details/FriendDetails.tsx";

export default function App() {

    const routes: Array<RouteObject> = [
        {path: RouterEnum.MAIN, element: <Main/>},
        {path: RouterEnum.AUTH_CALLBACK, element: <AuthCallback/> },
        {path: RouterEnum.PROFILE, element: <Profile/> },
        {path: RouterEnum.GAME_DETAILS, element: <GameDetails/>},
        {path: RouterEnum.GAMES, element: <Games/>},
        {path: RouterEnum.FRIENDS, element: <Friends/>},
        {path: RouterEnum.FRIENDS_DETAILS, element: <FriendDetails/>},
        {path: "*", element: <NotFound/>},
    ]

    if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
    }

	return (
        <Providers>
            <Layout>
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))}
                </Routes>
            </Layout>
        </Providers>
	)
}