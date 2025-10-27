import type { ColumnDef } from "@tanstack/react-table";

import type { TotalSalesMan } from "@/table-types/total-sales-man-table-type";

import SalesmanTableColumnDropdown from "@/table-columns-dropdown/salesman-table-column-dropdown";

export const salesmanColumns: ColumnDef<TotalSalesMan>[] = [
  {
    accessorKey: "sales_unique_id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("sales_unique_id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Salesman Name",
    cell: ({ row }) => (
      <span className="font-medium text-zinc-800">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("email") || "N/A"}</span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-zinc-600">{row.getValue("phone")}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <SalesmanTableColumnDropdown
          id={row.original.id}
          salesman={row.original}
        />
      );
    },
  },
];
