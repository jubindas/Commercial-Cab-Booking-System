import type { ColumnDef } from "@tanstack/react-table";
import type { Vendor } from "@/table-types/vendor-table-types";
import VendorTableColumnDropdown from "@/table-columns-dropdown/vendor-table-column-dropdown";

export const vendorColumns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Vendor Name",
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
    accessorKey: "alternative_phone_number",
    header: "Alt. Phone",
    cell: ({ row }) => (
      <span className="text-zinc-700">
        {row.getValue("alternative_phone_number") || "-"}
      </span>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("address")}</span>
    ),
  },
  {
    accessorKey: "current_membership_id",
    header: "Membership ID",
    cell: ({ row }) => (
      <span className="text-zinc-700">
        {row.getValue("current_membership_id") || "N/A"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <VendorTableColumnDropdown vendor={row.original} />
    ),
  },
];
