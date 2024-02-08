"use client";
import type { ColumnDef } from "@tanstack/react-table";

import type { Event, EventRegistration, School } from "@repo/types";
import { DataTableColumnHeader } from "@ui/components/table/data-table-column-header";
import { formatDate, toRupiah } from "@repo/utils";
import React from "react";

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
];
