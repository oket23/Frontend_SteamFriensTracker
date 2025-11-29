import type {SteamPlatforms} from "@/types/IGameDetails.ts";

const renderPlatforms = (platforms: SteamPlatforms) => {
    const items: string[] = [];

    if (platforms.windows) items.push("Windows");
    if (platforms.mac) items.push("macOS");
    if (platforms.linux) items.push("Linux");

    if (items.length === 0) return "—";

    return items.join(" · ");
};

export default renderPlatforms;