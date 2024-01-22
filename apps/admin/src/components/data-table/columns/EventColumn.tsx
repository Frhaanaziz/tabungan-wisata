"use client";
import { Button } from "@ui/components/button";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import type { ColumnDef, Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@ui/components/dialog";

import type { Event } from "@repo/types";

import { formatDate, toRupiah } from "@repo/utils";
import UpdateEventForm from "@/components/forms/UpdateEventForm";
import React from "react";

export const eventColumn: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          Name
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-3">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "school",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          School
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-3">{row.original.school.name}</div>,
  },
  {
    accessorKey: "cost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          Cost
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3">{toRupiah(row.getValue("cost"))}</div>
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          Start Date
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3">{formatDate(row.getValue("startDate"))}</div>
    ),
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          End Date
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3">{formatDate(row.getValue("endDate"))}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

function ActionCell({ row }: { row: Row<Event> }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const event = row.original;
  //   const id = useId();
  //   const utils = api.useUtils();

  //   const { mutate } = api.event.delete.useMutation({
  //     onMutate: () => {
  //       toast.loading("Deleting event...", { id });
  //     },
  //     onSuccess: async () => {
  //       toast.success("Event deleted", { id });
  //       await utils.event.getAll.invalidate();
  //     },
  //     onError: (error) => {
  //       toast.error(getErrorMessage(error), { id });
  //     },
  //   });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <DialogTrigger className="w-full">Edit</DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="max-w-3xl">
        <UpdateEventForm event={event} setModalOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
