import type { ColumnDef } from "@tanstack/react-table";
import type { CreatedVendors } from "@/table-types/created-vendors-table-types";
import CreatedVendorsTableColumnDropdown from "@/table-columns-dropdown/created-vendors-table-column-dropdown";

export const createdVendorsColumns: ColumnDef<CreatedVendors>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-zinc-700">{row.getValue("id")}</span>,
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
    header: "Phone Number",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("phone")}</span>
    ),
  },
  {
    accessorKey: "actions",
    header: "ACTIONS",
    cell: ({row})=> <CreatedVendorsTableColumnDropdown id={row.original.id} />
  }
];
