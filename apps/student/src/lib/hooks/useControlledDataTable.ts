import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PaginatedDataUtils } from "@repo/types";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDebounce } from "./useDebounce";

interface UseDataTableProps {
  data: any[];
  columns: ColumnDef<any>[];
  utils: PaginatedDataUtils;
}

export function useControlledDataTable({
  data,
  columns,
  utils,
}: UseDataTableProps) {
  const { currentPage, rowsPerPage, totalPages } = utils;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState("");
  const [prevSearch, setPrevSearch] = useState("");
  const debouncedQuery = useDebounce(search);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: currentPage,
    pageSize: rowsPerPage,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    pageCount: totalPages + 1,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  useEffect(() => {
    const createQueryString = () => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageIndex.toString());
      params.set("search", debouncedQuery);

      if (prevSearch !== debouncedQuery) table.setPageIndex(1);
      setPrevSearch(debouncedQuery);

      return params.toString();
    };

    router.replace(
      pathname + "?" + createQueryString(),

      { scroll: false },
    );
  }, [
    pageIndex,
    debouncedQuery,
    pathname,
    router,
    searchParams,
    prevSearch,
    table,
  ]);

  return {
    table,
    setSearch,
    search,
  };
}
