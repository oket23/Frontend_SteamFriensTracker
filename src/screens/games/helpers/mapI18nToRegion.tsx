const mapI18nToRegion = (lng: string): string => {
    const base = lng.split("-")[0];

    switch (base) {
        case "uk":
            return "UA";
        case "pl":
            return "PL";
        case "de":
            return "DE";
        case "en":
        default:
            return "US";
    }
};

export default mapI18nToRegion;