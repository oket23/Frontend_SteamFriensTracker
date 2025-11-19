import {Route, type RouteObject, Routes} from "react-router";
import {RouterEnum} from "@/config/RouterEnum.tsx";
import Main from "@/screens/main/Main.tsx";
import Providers from "@/providers/Providers.tsx";

export default function App() {

    const routes: Array<RouteObject> = [
        {path: RouterEnum.MAIN, element: <Main/>},
    ]

    if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
    }

	return (
        <Providers>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element}/>
                ))}
            </Routes>
        </Providers>
	)
}