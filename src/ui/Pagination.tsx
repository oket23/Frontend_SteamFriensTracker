import { useMemo } from "react";
import { cn } from "@/helpers/cn";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
}

const averageVal = (a: number, b: number) => Math.floor((a + b) / 2);

type PageItem =
    | number
    | {
    isMiddleBtn: true;
    page: number;
};

const Pagination = ({
                        currentPage,
                        totalPages,
                        onPageChange,
                        siblingCount = 1,
                    }: PaginationProps) => {
    const paginationRange = useMemo<PageItem[]>(() => {
        const totalPageNumbers = siblingCount * 2 + 5;

        if (totalPageNumbers >= totalPages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        const shouldLeftDots = leftSiblingIndex > 2;
        const shouldRightDots = rightSiblingIndex < totalPages - 1;

        if (!shouldLeftDots && shouldRightDots) {
            const leftRange = Array.from(
                { length: 3 + 2 * siblingCount },
                (_, i) => i + 1
            );

            return [
                ...leftRange,
                { isMiddleBtn: true, page: averageVal(leftRange.length - 1, lastPageIndex) },
                lastPageIndex,
            ];
        }

        if (shouldLeftDots && !shouldRightDots) {
            const rightRange = Array.from(
                { length: 3 + 2 * siblingCount },
                (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i
            );

            return [
                firstPageIndex,
                { isMiddleBtn: true, page: averageVal(firstPageIndex, rightRange[0]) },
                ...rightRange,
            ];
        }

        if (shouldLeftDots && shouldRightDots) {
            const middleRange = Array.from(
                { length: rightSiblingIndex - leftSiblingIndex + 1 },
                (_, i) => leftSiblingIndex + i
            );

            return [
                firstPageIndex,
                {
                    isMiddleBtn: true,
                    page: averageVal(firstPageIndex, middleRange[0]),
                },
                ...middleRange,
                {
                    isMiddleBtn: true,
                    page: averageVal(middleRange[middleRange.length - 1], lastPageIndex),
                },
                lastPageIndex,
            ];
        }

        return [];
    }, [currentPage, totalPages, siblingCount]);

    if (totalPages <= 1) return null;

    const handleChange = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        onPageChange(page);
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                onClick={() => handleChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-slate-800 text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
                ←
            </button>

            {paginationRange.map((page, i) =>
                typeof page !== "number" && page?.isMiddleBtn ? (
                    <button
                        key={i}
                        onClick={() => handleChange(page.page)}
                        className="px-3 py-1 rounded bg-slate-900 text-slate-200 hover:bg-slate-800"
                    >
                        ...
                    </button>
                ) : (
                    <button
                        key={i}
                        onClick={() => handleChange(page as number)}
                        className={cn(
                            "px-3 py-1 rounded text-xs sm:text-sm",
                            page === currentPage
                                ? "bg-sky-500 text-slate-950"
                                : "bg-slate-900 text-slate-200 hover:bg-slate-800"
                        )}
                    >
                        {page as number}
                    </button>
                )
            )}

            <button
                onClick={() => handleChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-slate-800 text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
                →
            </button>
        </div>
    );
};

export default Pagination;
