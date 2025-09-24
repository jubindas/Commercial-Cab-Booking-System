import type { ColumnDef } from "@tanstack/react-table";
import type { TotalSalesMan } from "@/table-types/total-sales-man-table-type";
import SalesmanTableColumnDropdown from "@/table-columns-dropdown/salesman-table-column-dropdown";

export const salesmanColumns: ColumnDef<TotalSalesMan>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("id")}</span>
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
    accessorKey: "phone_num",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("phone_num")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-zinc-600">{row.getValue("description")}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <SalesmanTableColumnDropdown salesman={row.original} />
    ),
  },
];
