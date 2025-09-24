import type { ColumnDef } from "@tanstack/react-table";
import type { SaledMembership } from "@/table-types/saled-membership-table-type";

export const saledMembershipColumns: ColumnDef<SaledMembership>[] = [
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
