import type { ReactNode } from "react";
import { cn } from "@/helpers/cn";

interface CenterMessageProps {
    title: string;
    desc: string;
    icon?: ReactNode;
    className?: string;
}

const CenterMessage = ({ title, desc, icon, className }: CenterMessageProps) => {
    return (
        <div
            className={cn(
                "relative flex min-h-[calc(99.7vh-7rem)] items-center justify-center",
                "bg-slate-950 text-slate-100 px-4 py-10",
                className
            )}
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
                <div className="absolute -bottom-24 left-1/3 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(800px_500px_at_20%_110%,rgba(52,211,153,0.10),transparent_55%)]" />
            </div>

            <div className="relative w-full max-w-lg">
                <div
                    className={cn(
                        "flex flex-col items-center text-center",
                        "rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-10",
                        "shadow-[0_20px_60px_-30px_rgba(0,0,0,0.75)] backdrop-blur-xl"
                    )}
                >
                    <div className="relative mb-5">
                        <div className="absolute inset-0 rounded-full bg-sky-500/15 blur-xl" />
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 border border-white/10">
                            {icon ?? (
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="h-6 w-6 text-slate-300"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>

                    <h2 className="text-base font-semibold text-slate-50 sm:text-lg">
                        {title}
                    </h2>

                    <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-400 sm:text-sm">
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CenterMessage;
