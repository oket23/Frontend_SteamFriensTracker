import type { ISteamStoreSearchResponse } from "@/types/ISteamSearch.ts";

type Price = ISteamStoreSearchResponse["items"][number]["price"];

export type PriceInfo =
    | { kind: "free"; final: string }
    | { kind: "normal"; final: string }
    | { kind: "discount"; final: string; initial: string; discountPercent: number };

const formatPrice = (price: Price | null | undefined): PriceInfo => {
    if (!price) {
        return { kind: "free", final: "Free to play" };
    }

    const finalValue = price.final / 100;
    const initialValue = price.initial / 100;

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: price.currency || "UAH",
    });

    const finalFormatted = formatter.format(finalValue);

    if (price.initial === price.final || initialValue === 0) {
        return { kind: "normal", final: finalFormatted };
    }

    const initialFormatted = formatter.format(initialValue);
    const discountPercent = Math.round((1 - finalValue / initialValue) * 100);

    return {
        kind: "discount",
        final: finalFormatted,
        initial: initialFormatted,
        discountPercent,
    };
};

export default formatPrice;
