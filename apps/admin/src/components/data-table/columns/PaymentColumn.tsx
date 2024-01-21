"use client";
import { Button } from "@ui/components/button";
import { ChevronsUpDown } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import type { Payment } from "@repo/types";
import { formatDateWithTime, toRupiah } from "@repo/utils";
import { Badge } from "@ui/components/badge";

const paymentStatusClass = {
  pending: "bg-yellow-500 hover:bg-yellow-500",
  completed: "bg-green-500 hover:bg-green-500",
  failed: "bg-red-500 hover:bg-red-500",
};

export const paymentColumn: ColumnDef<Payment>[] = [
  {
    accessorKey: "user",
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
    cell: ({ row }) => <div className="pl-3">{row.original.user.name}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          Amount
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3">{toRupiah(row.getValue("amount"))}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          Status
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof paymentStatusClass;

      return (
        <div className="pl-3">
          {
            <Badge className={`${paymentStatusClass[status]}`}>
              {row.getValue("status")}
            </Badge>
          }
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          Date
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3">{formatDateWithTime(row.getValue("date"))}</div>
    ),
  },
];
