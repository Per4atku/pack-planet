"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationControlsProps {
  totalPages: number;
  edgeCount?: number;
  siblingCount?: number;
}

const PaginationControls = ({
  totalPages,
  edgeCount = 1,
  siblingCount = 1,
}: PaginationControlsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="fixed px-4 bottom-10 w-full max-w-sm left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 flex flex-wrap justify-center gap-2 transform hover:-translate-y-1 transition-all duration-200 pointer-events-auto">
        <Pagination>
          <PaginationContent className="flex flex-wrap justify-center gap-1">
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    setPage(currentPage - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              />
            </PaginationItem>

            {/* Pages */}
            {(() => {
              const items: React.ReactNode[] = [];
              let prevWasEllipsis = false;

              for (let page = 1; page <= totalPages; page++) {
                const isEdgePage =
                  page <= edgeCount || page > totalPages - edgeCount;
                const isNearCurrent =
                  Math.abs(page - currentPage) <= siblingCount;
                const showPage = isEdgePage || isNearCurrent;

                if (showPage) {
                  items.push(
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="px-3 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                  prevWasEllipsis = false;
                } else if (!prevWasEllipsis) {
                  items.push(<PaginationEllipsis key={`ellipsis-${page}`} />);
                  prevWasEllipsis = true;
                }
              }

              return items;
            })()}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    setPage(currentPage + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PaginationControls;
