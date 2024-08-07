'use client';

import { Table } from '@tanstack/react-table';

import { Button } from '@ui/components/shadcn/button';
import { DataTableViewOptions } from './data-table-view-options';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Input } from '../shadcn/input';
import { paymentMethods, paymentStatus } from '@repo/utils/constants';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchBy?: string;
}

export function DataTableToolbar<TData>({
  table,
  searchBy,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchBy && (
          <Input
            placeholder={`Filter ${searchBy}...`}
            value={
              (table.getColumn(searchBy)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(searchBy)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={paymentStatus}
          />
        )}
        {table.getColumn('paymentMethod') && (
          <DataTableFacetedFilter
            column={table.getColumn('paymentMethod')}
            title="Payment Method"
            options={paymentMethods}
            className="hidden sm:flex"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross1Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
