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

import type { School } from "@repo/types";
import UpdateSchoolForm from "@/components/forms/UpdateSchoolForm";

export const schoolColumns: ColumnDef<School>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          School Code
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-3">{row.getValue("code")}</div>,
  },
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
    accessorKey: "contact",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          Contact
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-3">{row.getValue("contact")}</div>,
  },
  {
    accessorKey: "total users",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          Total Users
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3">{row.original._count.users ?? ""}</div>
    ),
  },
  {
    accessorKey: "total events",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          Total Events
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3">{row.original._count.events ?? ""}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

function ActionCell({ row }: { row: Row<School> }) {
  const school = row.original;
  // const id = useId();
  // const utils = api.useUtils();
  // const router = useRouter();

  // const { mutate } = api.keyword.delete.useMutation({
  //   onMutate: () => {
  //     toast.loading("Deleting keyword...", { id });
  //   },
  //   onSuccess: () => {
  //     toast.success("Keyword deleted", { id });
  //     utils.keyword.getAll.invalidate();
  //     router.refresh();
  //   },
  //   onError: (error) => {
  //     toast.error(getErrorMessage(error), { id });
  //   },
  // });

  return (
    <Dialog>
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

      <DialogContent>
        <UpdateSchoolForm school={school} />
      </DialogContent>
    </Dialog>
  );
}
