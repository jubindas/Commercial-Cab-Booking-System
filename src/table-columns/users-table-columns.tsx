import type { User } from "@/table-types/user-table-types";
import type { ColumnDef } from "@tanstack/react-table";

export const userColumns: ColumnDef<User>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
    accessorFn: (row)=> row.phone || "N/A"
  },
  {
    header: "Alt. Phone",
    accessorKey: "alternative_phone_number",
    cell: ({ row }) => (
      <span>{row.getValue("alternative_phone_number") || "N/A"}</span>
    ),
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "State",
    accessorFn: (row) => row.state?.name || "N/A",
  },
  {
    header: "Sales ID",
    accessorKey: "sales_unique_id",
    accessorFn: (row) => row.sales_unique_id || "N/A",
  },
  {
    header: "Active",
    accessorFn: (row) => (row.is_active ? "Yes" : "No"),
  },
  {
    header: "Approved",
    accessorFn: (row) => (row.is_approved ? "Yes" : "No"),
  },
];
