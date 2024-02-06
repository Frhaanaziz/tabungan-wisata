'use client';
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { paginatedDataUtilsSchema } from '@repo/validators';
import { usePathname, useSearchParams } from 'next/navigation';
import { z } from 'zod';

function calculatePages(
  totalPages: number,
  currentPage: number
): { previous: number[]; next: number[] } {
  const previous: number[] = [];
  const next: number[] = [];
  const startPrevious = Math.max(1, currentPage - 3);
  const endPrevious = Math.min(totalPages, currentPage - 1);
  const startNext = Math.max(1, currentPage + 1);
  const endNext = Math.min(totalPages, currentPage + 3);

  for (let page = startPrevious; page <= endPrevious; page++) {
    previous.push(page);
  }

  for (let page = startNext; page <= endNext; page++) {
    next.push(page);
  }

  return { previous, next };
}

type PaginationProps = z.infer<typeof paginatedDataUtilsSchema> & {};

const Pagination = ({
  currentPage,
  isFirstPage,
  isLastPage,
  nextPage,
  previousPage,
  totalPages,
}: PaginationProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const costLTE = searchParams.get('costLTE') || '';
  const costGTE = searchParams.get('costGTE') || '';
  const durationLTE = searchParams.get('durationLTE') || '';
  const durationGTE = searchParams.get('durationGTE') || '';

  function createQueryString(page: string) {
    const params = new URLSearchParams();
    params.append('page', page);
    if (costLTE) params.append('costLTE', costLTE);
    if (costGTE) params.append('costGTE', costGTE);
    if (durationLTE) params.append('durationLTE', durationLTE);
    if (durationGTE) params.append('durationGTE', durationGTE);
    return params.toString();
  }

  const { next, previous } = calculatePages(totalPages, currentPage);
  return (
    <PaginationComponent className="my-10 justify-start container">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${isFirstPage ? 'pointer-events-none text-black/50' : ''}`}
            // href={`${pathName}?page=${previousPage}`}
            href={`${pathName}?${createQueryString(previousPage.toString())}`}
            scroll={false}
          />
        </PaginationItem>
        <PaginationItem>
          {previous.map((page) => (
            <PaginationLink
              key={page}
              // href={`${pathName}?page=${page}`}
              href={`${pathName}?${createQueryString(page.toString())}`}
              scroll={false}
            >
              {page}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          {next.map((page) => (
            <PaginationLink
              key={page}
              // href={`${pathName}?page=${page}`}
              href={`${pathName}?${createQueryString(page.toString())}`}
              scroll={false}
            >
              {page}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={`${isLastPage ? 'pointer-events-none text-black/50' : ''}`}
            // href={`${pathName}?page=${nextPage}`}
            href={`${pathName}?${createQueryString(nextPage.toString())}`}
            scroll={false}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
};

export default Pagination;
