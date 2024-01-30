"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Withdrawal } from "@repo/types";
import { formatDate, toRupiah } from "@repo/utils";
import React from "react";
import { DataTableColumnHeader } from "@ui/components/table/data-table-column-header";

export const withdrawalColumn: ColumnDef<Withdrawal>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => <div>{row.original?.user?.name ?? ""}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Amount" />;
    },
    cell: ({ row }) => <div>{toRupiah(row.getValue("amount"))}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />;
    },
    cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"))}</div>,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Updated At" />;
    },
    cell: ({ row }) => <div>{formatDate(row.getValue("updatedAt"))}</div>,
  },
];
