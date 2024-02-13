"use client";
import type { ColumnDef, Row } from "@tanstack/react-table";

import type { Event, EventRegistration, School } from "@repo/types";
import { DataTableColumnHeader } from "@ui/components/table/data-table-column-header";
import { formatDate, toRupiah } from "@repo/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/components/shadcn/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ui/components/shadcn/dialog";

import React from "react";
import { Button } from "@ui/components/shadcn/button";
import { MoreHorizontalIcon } from "lucide-react";
import UpdateEventRegistrationForm from "@/components/forms/UpdateEventRegistrationForm";

export const EventRegistrationColumn: ColumnDef<
  EventRegistration & { event: Event; school: School }
>[] = [
  {
    accessorKey: "school",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="School" />;
    },
    cell: ({ row }) => <div>{row.original?.school.name}</div>,
  },
  {
    accessorKey: "event",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Event" />;
    },
    cell: ({ row }) => <div>{row.original?.event.name ?? ""}</div>,
  },
  {
    accessorKey: "cost",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Cost" />;
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

function ActionCell({ row }: { row: Row<EventRegistration> }) {
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const eventRegistration = row.original;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <DialogTrigger className="w-full">Edit</DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="max-w-xl">
        <UpdateEventRegistrationForm
          eventRegistration={eventRegistration}
          setDialogOpen={setDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
