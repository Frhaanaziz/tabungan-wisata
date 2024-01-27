"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings2,
} from "lucide-react";

import { Button } from "@ui/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/shadcn/dropdown-menu";
import { Input } from "@ui/components/shadcn/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/shadcn/table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PaginatedDataUtils } from "@repo/types";

export function SearchDataTable({
  data,
  columns,
  utils,
  SearchInput,
  emptyState = "No results.",
}: {
  data: any[];
  columns: ColumnDef<any>[];
  utils: PaginatedDataUtils;
  SearchInput: JSX.Element;
  emptyState?: string;
}) {
  const {
    currentPage,
    rowsPerPage,
    totalPages,
    isFirstPage,
    isLastPage,
    nextPage,
    previousPage,
  } = utils;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const createQueryString: any = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: currentPage,
    pageSize: rowsPerPage,
  });

  useEffect(() => {
    router.replace(
      pathname + "?" + createQueryString("page", pageIndex.toString()),
      { scroll: false },
    );
  }, [pageIndex, createQueryString, pathname, router]);

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

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <div className="flex">{SearchInput}</div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hidden gap-1.5 text-xs lg:flex"
              >
                <Settings2 className="h-4 w-4" /> View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyState}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between gap-5 overflow-x-auto py-4 ">
        <div className="flex items-center gap-2">
          <p className=" flex-shrink-0 font-semibold">
            Page{" "}
            <span>
              {currentPage} of {totalPages}
              {/* {table.getState().pagination.pageIndex} of{" "}
              {table.getPageCount() - 1} */}
            </span>
          </p>
        </div>

        <div className="hidden items-center gap-1 self-end sm:flex">
          <p className="font-semibold">Go to page:</p>
          <Input
            type="number"
            min={1}
            defaultValue={table.getState().pagination.pageIndex}
            onChange={(e) => {
              if (
                parseInt(e.target.value) > totalPages ||
                parseInt(e.target.value) < 1
              )
                return;
              const page = parseInt(e.target.value);
              table.setPageIndex(page ? page : 1);
            }}
            className="w-16"
          />
        </div>

        <div className="flex-shrink-0 space-x-2">
          <Button
            size="icon"
            // onClick={() => table.setPageIndex(0)}
            onClick={() => table.setPageIndex(1)}
            disabled={isFirstPage}
            // disabled={!table.getCanPreviousPage()}
            className="hidden lg:inline-flex"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            onClick={() => table.setPageIndex(previousPage)}
            // onClick={() => table.previousPage()}
            disabled={isFirstPage}
            // disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => table.setPageIndex(nextPage)}
            // onClick={() => table.nextPage()}
            disabled={isLastPage}
            // disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            onClick={() => table.setPageIndex(totalPages)}
            // onClick={() => table.setPageIndex(table.getPageCount())}
            disabled={isLastPage}
            // disabled={!table.getCanNextPage()}
            className="hidden lg:inline-flex"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
