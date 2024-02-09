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
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/components/shadcn/alert-dialog";

import type { Event, School } from "@repo/types";

import { formatDate, getErrorMessage, toRupiah } from "@repo/utils";
import React from "react";
import { DataTableColumnHeader } from "@ui/components/table/data-table-column-header";
import Link from "next/link";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Badge } from "@ui/components/shadcn/badge";

const highlightVariants = {
  true: "border-transparent bg-green-500 hover:bg-green-500/80",
  false: "border-transparent bg-yellow-500 hover:bg-yellow-500/80",
};

export const eventColumn: ColumnDef<Event & { school: School }>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "cost",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Minimum Cost" />;
    },
    cell: ({ row }) => <div>{toRupiah(row.getValue("cost"))}</div>,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Duration (days)" />;
    },
    cell: ({ row }) => <div>{row.getValue("duration")}</div>,
  },
  {
    accessorKey: "highlighted",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Highlighted" />;
    },
    cell: ({ row }) => {
      const value = row.getValue("highlighted") as "true" | "false";
      return (
        <Badge
          className={highlightVariants[value]}
        >{`${row.getValue("highlighted")}`}</Badge>
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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

function ActionCell({ row }: { row: Row<Event & { school: School }> }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const event = row.original;

  const utils = api.useUtils();
  const { mutate } = api.event.delete.useMutation({
    onSuccess: async () => {
      await utils.event.invalidate();
      toast.success("Event deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
            This action cannot be undone. This will permanently delete the event
            and remove your data from servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button
            variant={"destructive"}
            onClick={() => {
              setDialogOpen(false);
              mutate({ id: event.id });
            }}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
