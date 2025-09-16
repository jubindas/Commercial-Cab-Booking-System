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
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("phone")}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("category")}</span>
    ),
  },
  {
    accessorKey: "subCategory",
    header: "Sub Category",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("subCategory")}</span>
    ),
  },
  {
    accessorKey: "membersgip",
    header: "Membership",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("membersgip")}</span>
    ),
  },
  {
    accessorKey: "timeCreated",
    header: "Created On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("timeCreated"));
      return (
        <span className="text-zinc-600 text-sm">
          {date.toLocaleDateString()}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <VendorTableColumnDropdown
        id={row.original.id}
        status={row.original.status}
      />
    ),
  },
];
