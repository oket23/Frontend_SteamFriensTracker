import { Link, useLocation, useNavigate } from "react-router";
import { RouterEnum } from "@/config/RouterEnum";
import { cn } from "@/helpers/cn";
import useModal from "@/hooks/useModal/useModal";
import UserDataModal from "@/features/userDataModal.tsx";
import store from "store2";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { label: "Мої завдання", path: RouterEnum.MAIN },
        { label: "API Документація", path: RouterEnum.API_CONFIG },
    ];

    const userDataModal = useModal(true);

    const authStorage = store.get("auth-storage-todo");
    const isLoggedIn = !!authStorage?.state?.accessToken;

    const baseNavClasses =
        "relative inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-all";
    const activeClasses =
        "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/40";
    const inactiveClasses =
        "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-sky-100";

    const handleOpenUserData = () => {
        if (!isLoggedIn) {
            navigate(RouterEnum.LOGIN);
            return;
        }

        userDataModal.onOpen();
    };

    return (
        <>
            <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 text-lg font-bold text-white">
                            T
                        </div>
                        <span className="text-lg font-semibold text-slate-100">
                            Todo App
                        </span>
                    </div>

                    <nav className="flex items-center gap-3">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        baseNavClasses,
                                        isActive ? activeClasses : inactiveClasses
                                    )}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        <button
                            type="button"
                            onClick={handleOpenUserData}
                            className={cn(
                                baseNavClasses,
                                userDataModal.open ? activeClasses : inactiveClasses
                            )}
                        >
                            Мої дані
                        </button>
                    </nav>
                </div>
            </header>

            <UserDataModal {...userDataModal} />
        </>
    );
};

export default Header;
