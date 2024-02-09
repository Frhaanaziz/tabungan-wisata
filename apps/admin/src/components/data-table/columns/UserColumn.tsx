"use client";
import type { ColumnDef } from "@tanstack/react-table";

import type { User, UserRole } from "@repo/types";
import { formatDate, toRupiah } from "@repo/utils";
import { DataTableColumnHeader } from "@ui/components/table/data-table-column-header";
import { Badge } from "@ui/components/shadcn/badge";

const roleVariants = {
  admin: "border-transparent bg-red-500 hover:bg-red-500/80",
  student: "border-transparent bg-green-500 hover:bg-green-500/80",
  teacher: "border-transparent bg-blue-500 hover:bg-blue-500/80",
};

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
    cell: ({ row }) => {
      const value = row.getValue("role") as UserRole;
      return (
        <Badge className={roleVariants[value]}>{row.getValue("role")}</Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />;
    },
    cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"))}</div>,
  },
];
