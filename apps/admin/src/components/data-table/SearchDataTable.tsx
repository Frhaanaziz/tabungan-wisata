"use client";

import { flexRender } from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";

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
import type { PaginatedDataUtils } from "@repo/types";
import { useControlledDataTable } from "@/lib/hooks/useControlledDataTable";

interface SearchDataTableProps {
  data: any[];
  columns: ColumnDef<any>[];
  utils: PaginatedDataUtils;
  SearchInput?: JSX.Element;
  emptyState?: string;
}

export function SearchDataTable({
  data,
  columns,
  utils,
  emptyState = "No results.",
}: SearchDataTableProps) {
  const {
    currentPage,
    isFirstPage,
    isLastPage,
    nextPage,
    previousPage,
    totalPages,
  } = utils;
  console.log(utils);

  const { table, setSearch, search } = useControlledDataTable({
    columns,
    data,
    utils,
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        {/* <div className="flex">{SearchInput}</div> */}
        <div className="flex">
          <Input
            placeholder="Filter names..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="max-w-sm"
          />
        </div>

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
          <p className=" flex-shrink-0 text-sm font-medium">
            Page{" "}
            <span>
              {currentPage} of {totalPages}
            </span>
          </p>
        </div>

        <div className="hidden items-center gap-1 self-end sm:flex">
          <p className="text-sm font-medium">Go to page:</p>
          <Input
            type="number"
            min={1}
            max={totalPages}
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
            className="h-8 w-16"
          />
        </div>

        <div className="flex-shrink-0 space-x-2">
          <Button
            size="icon"
            onClick={() => table.setPageIndex(1)}
            disabled={isFirstPage}
            className="hidden h-8 w-8 p-0 lg:inline-flex"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            onClick={() => table.setPageIndex(previousPage)}
            disabled={isFirstPage}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => table.setPageIndex(nextPage)}
            disabled={isLastPage}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            onClick={() => table.setPageIndex(totalPages)}
            disabled={isLastPage}
            className="hidden h-8 w-8 p-0 lg:inline-flex"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
