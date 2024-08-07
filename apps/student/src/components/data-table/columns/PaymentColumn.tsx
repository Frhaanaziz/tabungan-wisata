"use client";
import type { ColumnDef } from "@tanstack/react-table";

import type { Payment } from "@repo/types";
import {
  convertPaymentMethod,
  getRelativeTimeString,
  toRupiah,
} from "@repo/utils";
import { Badge } from "@ui/components/shadcn/badge";
import { DataTableColumnHeader } from "@ui/components/table/data-table-column-header";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@ui/components/shadcn/hover-card";

const paymentStatusClass = {
  pending: "bg-yellow-500 hover:bg-yellow-500",
  completed: "bg-green-500 hover:bg-green-500",
  failed: "bg-red-500 hover:bg-red-500",
};

export const paymentColumn: ColumnDef<Payment>[] = [
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Amount" />;
    },
    cell: ({ row }) => <div>{toRupiah(row.getValue("amount"))}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof paymentStatusClass;

      return (
        <div>
          {
            <Badge className={`${paymentStatusClass[status]}`}>
              {row.getValue("status")}
            </Badge>
          }
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Payment Method" />;
    },
    cell: ({ row }) => (
      <div>{convertPaymentMethod(row.getValue("paymentMethod"))}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />;
    },
    cell: ({ row }) => (
      <HoverCard>
        <HoverCardTrigger asChild>
          <p className="inline-block hover:underline">
            {getRelativeTimeString(row.getValue("createdAt"))}
          </p>
        </HoverCardTrigger>
        <HoverCardContent className="w-fit p-1.5 text-xs">
          {new Date(row.getValue("createdAt")).toLocaleString()}
        </HoverCardContent>
      </HoverCard>
    ),
  },
];
