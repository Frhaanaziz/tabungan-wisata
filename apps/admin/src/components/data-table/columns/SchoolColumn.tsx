"use client";
import { Button } from "@ui/components/shadcn/button";
import { MoreHorizontal } from "lucide-react";
import type { ColumnDef, Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/components/shadcn/dropdown-menu";

import type { School } from "@repo/types";
import { DataTableColumnHeader } from "@ui/components/table/data-table-column-header";
import Link from "next/link";
import React from "react";

export const schoolColumns: ColumnDef<School>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="School Code" />;
    },
    cell: ({ row }) => <div>{row.getValue("code")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "contact",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Contact" />;
    },
    cell: ({ row }) => <div>{row.getValue("contact")}</div>,
  },
  {
    accessorKey: "total users",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total Users" />;
    },
    cell: ({ row }) => <div>{row.original?._count?.users ?? ""}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

function ActionCell({ row }: { row: Row<School> }) {
  const school = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/schools/${school.id}/update`} className="w-full">
            Edit
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
