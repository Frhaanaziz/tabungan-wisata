"use client";
import { Button } from "@ui/components/button";
import { ChevronsUpDown } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import type { User } from "@repo/types";
import { formatDate } from "@repo/utils";

export const userColumn: ColumnDef<User>[] = [
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          Email
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-3">{row.getValue("email")}</div>,
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
    cell: ({ row }) => (
      <div className="pl-3">{row.original.school.name ?? ""}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          Role
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-3">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          size="sm"
          className="text-md"
        >
          Created At
          <ChevronsUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3">{formatDate(row.getValue("createdAt"))}</div>
    ),
  },
  //   {
  //     id: "actions",
  //     enableHiding: false,
  //     cell: ({ row }) => <ActionCell row={row} />,
  //   },
];

// function ActionCell({ row }: { row: Row<User> }) {
//   const id = useId();
//   const utils = api.useUtils();
//   const router = useRouter();

//   const { mutate } = api.keyword.delete.useMutation({
//     onMutate: () => {
//       toast.loading("Deleting keyword...", { id });
//     },
//     onSuccess: () => {
//       toast.success("Keyword deleted", { id });
//       utils.keyword.getAll.invalidate();
//       router.refresh();
//     },
//     onError: (error) => {
//       toast.error(getErrorMessage(error), { id });
//     },
//   });

//   return (
//     <AlertDialog>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem asChild>
//             <AlertDialogTrigger className="w-full">
//               Make admin
//             </AlertDialogTrigger>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             You are about to grant admin privileges to this user. This action
//             will allow them full access to all administrative features and
//             sensitive data. Please confirm that you trust this user with these
//             capabilities. This change should be made cautiously as it can
//             significantly impact system security and integrity.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             className={buttonVariants({ variant: "destructive" })}
//           >
//             Continue
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
