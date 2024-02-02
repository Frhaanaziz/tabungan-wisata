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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/components/shadcn/alert-dialog";

import type { Event, School } from "@repo/types";

import { formatDate, toRupiah } from "@repo/utils";
import React from "react";
import { DataTableColumnHeader } from "@ui/components/table/data-table-column-header";
import Link from "next/link";

export const eventColumn: ColumnDef<Event & { school: School }>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  // {
  //   accessorKey: "school",
  //   header: ({ column }) => {
  //     return <DataTableColumnHeader column={column} title="School" />;
  //   },
  //   cell: ({ row }) => <div>{row.original.school.name ?? ""}</div>,
  // },
  {
    accessorKey: "cost",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Minimum Cost" />;
    },
    cell: ({ row }) => <div>{toRupiah(row.getValue("cost"))}</div>,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Start Date" />;
    },
    cell: ({ row }) => <div>{formatDate(row.getValue("startDate"))}</div>,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="End Date" />;
    },
    cell: ({ row }) => <div>{formatDate(row.getValue("endDate"))}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

function ActionCell({ row }: { row: Row<Event & { school: School }> }) {
  const event = row.original;

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/events/${event.id}/update`}>Edit</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <AlertDialogTrigger className="w-full">Delete</AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
