import type { FC, PropsWithChildren } from "react";
import Header from "./Header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-slate-100">
            <Header />

            <main className="flex-1 w-full">
                {children}
            </main>

            <footer className="border-t border-white/10 bg-slate-950/90 py-4 text-center text-[11px] text-slate-400/80 backdrop-blur-xl text-sm">
                <p className="tracking-wide">
                    © 2025 Todo App · Created for educational purposes.
                </p>
            </footer>
        </div>
    );
};

export default Layout;

