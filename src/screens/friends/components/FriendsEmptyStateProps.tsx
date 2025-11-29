import { useTranslation } from "react-i18next";
import { useFriendsStore } from "@/store/useFriendsStore";

interface FriendsEmptyStateProps {
    hasActiveFilters: boolean;
}

const FriendsEmptyState = ({ hasActiveFilters }: FriendsEmptyStateProps) => {
    const { t } = useTranslation();
    const { resetFilters } = useFriendsStore();

    return (
        <div className="mt-10 flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm font-semibold text-slate-100">
                {t("friendsPage.notFoundTitle")}
            </p>
            <p className="mt-1 text-xs text-slate-400">
                {t("friendsPage.notFoundDesc")}
            </p>

            {hasActiveFilters && (
                <button
                    onClick={resetFilters}
                    className="mt-4 text-sky-500 hover:underline text-sm"
                >
                    {t("friendsPage.resetAll")}
                </button>
            )}
        </div>
    );
};

export default FriendsEmptyState;
