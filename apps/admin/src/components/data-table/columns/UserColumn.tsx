"use client";
import type { ColumnDef, Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/components/shadcn/dropdown-menu";
import type { User } from "@repo/types";
import { formatDate, toRupiah } from "@repo/utils";
import { DataTableColumnHeader } from "@ui/components/table/data-table-column-header";
import { Badge } from "@ui/components/shadcn/badge";
import { UserRole } from "@repo/validators/user";
import { Button } from "@ui/components/shadcn/button";
import { MoreHorizontalIcon } from "lucide-react";

import Link from "next/link";
import { exportUserData } from "@/lib/utils";
import { toast } from "sonner";
import { getUserPayments } from "@/app/_actions/payment";

const roleVariants = {
  admin: "border-transparent bg-red-500 hover:bg-red-500/80",
  student: "border-transparent bg-green-500 hover:bg-green-500/80",
  teacher: "border-transparent bg-blue-500 hover:bg-blue-500/80",
} as const;

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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

function ActionCell({ row }: { row: Row<User> }) {
  const user = row.original;

  const handleExportUserData = async () => {
    const { data: payments, error } = await getUserPayments({ id: user.id });
    if (error) {
      toast.error(error);
      return;
    }

    const userData = { ...user, payments: payments ?? [] };
    exportUserData(userData);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/users/${user.id}`} className="w-full">
            View
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleExportUserData}>
          Export to excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
