"use client";
import type { ColumnDef } from "@tanstack/react-table";

import type { Notification } from "@repo/types";
import { convertPaymentMethod, getRelativeTimeString } from "@repo/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@ui/components/shadcn/hover-card";
import { DataTableColumnHeader } from "@ui/components/table/data-table-column-header";
import NotificationIcon from "@/components/NotificationIcon";
import { Badge } from "@ui/components/shadcn/badge";

export const notificationColumn: ColumnDef<Notification>[] = [
  {
    accessorKey: "message",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Amount" />;
    },
    cell: ({ row }) => {
      const { message, type, status, createdAt } = row.original;

      return (
        <div className="flex items-center gap-3">
          <NotificationIcon type={type} status={status} />
          <div className="space-y-1">
            <p className="truncate">{message}</p>

            <HoverCard>
              <HoverCardTrigger asChild>
                <p className="inline-block text-xs text-muted-foreground hover:underline">
                  {getRelativeTimeString(createdAt)}
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit p-1.5 text-xs">
                {new Date(createdAt).toLocaleString()}
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Type" />;
    },
    cell: ({ row }) => (
      <Badge variant={"outline"}>
        {convertPaymentMethod(row.getValue("type"))}
      </Badge>
    ),
  },
];
