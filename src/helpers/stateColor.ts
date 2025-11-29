const stateColor = (personaState?: string, isOnline?: boolean) => {
    if (isOnline) return "bg-emerald-400/15 text-emerald-300 ring-emerald-400/20";
    if ((personaState ?? "").toLowerCase() === "offline")
        return "bg-slate-400/10 text-slate-300 ring-white/10";
    return "bg-sky-400/15 text-sky-300 ring-sky-400/20";
};

export default stateColor;