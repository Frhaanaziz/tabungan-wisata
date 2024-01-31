"use client";
import type { ColumnDef } from "@tanstack/react-table";

import type { User } from "@repo/types";
import { formatDate, toRupiah } from "@repo/utils";
import { DataTableColumnHeader } from "@ui/components/table/data-table-column-header";

export const userColumn: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "school",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="School" />;
    },
    cell: ({ row }) => <div>{row.original?.school?.name ?? ""}</div>,
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Balance" />;
    },
    cell: ({ row }) => <div>{toRupiah(row.getValue("balance"))}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Role" />;
    },
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />;
    },
    cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"))}</div>,
  },
];
