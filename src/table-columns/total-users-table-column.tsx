import type { ColumnDef } from "@tanstack/react-table";
import type { TotalUsers } from "../table-types/total-users-table-type";

export const totalUsersColumns: ColumnDef<TotalUsers>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium text-zinc-800">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("phone")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("description")}</span>
    ),
  },
];
