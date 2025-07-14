'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from './ui/pagination';

const PaginationControls = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent className='mb-8'>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                setPage(currentPage - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        </PaginationItem>
        {(() => {
          const items = [];
          let prevWasEllipsis = false;

          for (let page = 1; page <= totalPages; page++) {
            const isEdgePage = page === 1 || page === totalPages;
            const isNearCurrent = Math.abs(page - currentPage) <= 1;
            const showPage =
              isEdgePage ||
              isNearCurrent ||
              (currentPage <= 3 && page <= 3) ||
              (currentPage >= totalPages - 2 && page >= totalPages - 2);

            if (showPage) {
              items.push(
                <PaginationItem key={page}>
                  <PaginationLink
                    href='#'
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
              prevWasEllipsis = false;
            } else if (!prevWasEllipsis) {
              items.push(
                <PaginationItem key={`ellipsis-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
              prevWasEllipsis = true;
            }
          }

          return items;
        })()}
        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                setPage(currentPage + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
