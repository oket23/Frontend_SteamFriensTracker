const FriendsLoadingGrid = () => (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="animate-pulse flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70 shadow-[0_18px_40px_rgba(15,23,42,0.8)]">
                <div className="h-28 w-full bg-slate-900" />
                <div className="flex-1 px-4 py-3 space-y-3">
                    <div className="h-3 w-3/4 rounded-full bg-slate-800" />
                    <div className="h-3 w-1/2 rounded-full bg-slate-800" />
                    <div className="mt-2 flex justify-end">
                        <div className="h-7 w-20 rounded-full bg-slate-800" />
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default FriendsLoadingGrid;
